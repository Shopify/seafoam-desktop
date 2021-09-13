import * as child_process from "child_process";
import * as fs from "fs";
import { promisify } from "util";
import { file } from "tmp-promise";
import ElectronLog from "electron-log";
import { dialog } from "electron";
import { IS_MAC } from "./main";

function isSeafoamCommandException(
  error: unknown
): error is SeafoamCommandException {
  return (error as SeafoamCommandException).stderr !== undefined;
}
export function handleSeafoamCommandError(e: unknown, title: string): void {
  if (e instanceof Error) {
    const message = isSeafoamCommandException(e)
      ? e.cmd || e.message
      : e.message;

    dialog.showMessageBoxSync({
      type: "error",
      title: title,
      message: IS_MAC ? title : message,
      detail: e.stack,
    });
  } else {
    ElectronLog.error(e);
  }
}

export async function fetchDotFromBgv(
  filename: DumpFileName,
  phase: number | string
): Promise<Dot> {
  const exec = promisify(child_process.exec);
  const readFile = promisify(fs.readFile);

  const { path, cleanup } = await file({ postfix: ".dot" });
  const command = `seafoam "${filename}:${phase}" render --out "${path}"`;

  try {
    ElectronLog.debug("Seafoam command:", command);

    const { stderr } = await exec(command);

    if (stderr) {
      ElectronLog.error(stderr);
      throw stderr;
    }

    const buffer = await readFile(path);
    const dot = buffer.toString("utf-8");

    ElectronLog.silly("DOT data:", dot);

    return dot;
  } finally {
    cleanup();
  }
}

export async function fetchCompilerPhases(
  filename: DumpFileName
): Promise<CompilerPhase[]> {
  const exec = promisify(child_process.exec);
  const command = `seafoam "${filename}" list`;

  ElectronLog.debug("Seafoam command:", command);

  const { stdout, stderr } = await exec(command);

  if (stderr) {
    ElectronLog.error(stderr);
    throw stderr;
  }

  ElectronLog.debug("Compiler phases:", stdout);

  const lines = stdout.split("\n");

  return lines
    .map((line) => {
      if (line.trim() === "") {
        return null;
      }

      // Split on the first run of white spaces.
      const [leftColumn, rightColumn] = line.split(/(?<=^\S+)\s+/);

      // The left column will look like:
      //
      // /tmp/TruffleHotSpotCompilation-10507[block_in_Truffle::EncodingOperations.build_encoding_map_<split-740a3cae>].bgv:0
      // \________________________________________________________________________________________________________________/ ^                                                                                                           ^  ^
      //                                               Filename                                                             |
      //                                                                                                                   /
      //                                                                                                       Phase number
      //
      // The last `:` separates the filename from the phase number.
      const leftColumnSplitPoint = leftColumn.lastIndexOf(":");

      const filename = leftColumn.substring(0, leftColumnSplitPoint);
      const phaseNumber = leftColumn.substring(leftColumnSplitPoint + 1);

      // The right column will look like:
      //
      // TruffleIR::block_in_Truffle::EncodingOperations_build_encoding_map_<split-740a3cae>()/Call Tree/Before Inline
      // \_______/  \________________________________________________________________________/ \_____________________/
      //   Type                                      Method name                                   Phase name
      //
      // This line has two split points. The first one is the first occurrence of `::`. The part to the left indicates
      // what type of nodes are displayed (e.g., TruffleIR or TruffleAST). The remaining part of the string is the
      // <method_name>/<phase_name>. The phase name may have a `/` embedded in it, so we need to be careful to match on
      // the first occurrence. That assumes the method name does not contain a `/` in it. To date, we have not seen one
      // that does.
      const rightColumnSplitPoint1 = rightColumn.indexOf("::");
      const rightColumnSplitPoint2 = rightColumn.indexOf("/");

      const type = rightColumn.substring(0, rightColumnSplitPoint1);
      const method = rightColumn.substring(
        rightColumnSplitPoint1 + 2,
        rightColumnSplitPoint2
      );
      const phaseName = rightColumn.substring(rightColumnSplitPoint2 + 1);

      // Seafoam doesn't currently have a way to process the "Call Tree" phases, so we ignore them.
      if (phaseName === "Call Tree") {
        return null;
      }

      return {
        filename: filename,
        method: method.split("()")[0],
        name: phaseName,
        number: parseInt(phaseNumber),
        type: type,
      };
    })
    .filter((phase_info): phase_info is CompilerPhase => !!phase_info);
}

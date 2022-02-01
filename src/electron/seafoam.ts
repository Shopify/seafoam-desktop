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
  const command = `seafoam --json "${filename}" list`;

  ElectronLog.debug("Seafoam command:", command);

  const { stdout, stderr } = await exec(command);

  if (stderr) {
    ElectronLog.error(stderr);
    throw stderr;
  }

  ElectronLog.debug("Compiler phases:", stdout);

  const decoded: SeafoamCompilerPhase[] = JSON.parse(stdout);

  // Seafoam doesn't currently have a way to process the "Call Tree" phases, so we ignore them.
  const validPhases = decoded.filter(
    (phase) => phase.graph_name_components[1] !== "Call Tree"
  );

  const phases = validPhases.map((phase) => {
    // The type value indicates what type of graph (e.g., TruffleIR or TruffleAST) was generated for this method.
    const [type, methodName] = phase.graph_name_components[0].split("::");

    return {
      filename: phase.graph_file,
      method: methodName.split("()")[0],
      name: phase.graph_name_components.slice(1).join("/"),
      number: phase.graph_index,
      type: type,
    };
  });

  return phases;
}

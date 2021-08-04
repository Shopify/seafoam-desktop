import * as child_process from "child_process";
import * as fs from "fs";
import { promisify } from "util";
import { file } from "tmp-promise";
import ElectronLog from "electron-log";

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
      const [part1, part2] = line.split(/(?<=^\S+)\s+/);
      const [filename, phase_number] = part1.split(":");

      // _type will generally be "TruffleAST" or "TruffleIR".
      const [type, rest] = part2.split("::");

      // It's possible for `rest` to have more than two "/", but that only happens
      // when there are call tree phases as well. Since Seafoam doesn't have a way
      // to process the call tree phases, we can ignore the phase names (i.e., the
      // data being dropped by the split limit).
      const [method, phase_name] = rest.split("/", 2);

      if (phase_name === "Call Tree") {
        return null;
      }

      return {
        filename: filename,
        method: method.split("()")[0],
        name: phase_name,
        number: parseInt(phase_number),
        type: type,
      };
    })
    .filter((phase_info) => phase_info !== null);
}

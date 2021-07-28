import * as child_process from "child_process";
import * as fs from "fs";
import { promisify } from "util";
import { file } from "tmp-promise";
import ElectronLog from "electron-log";

export async function fetchDotFromBgv(
  filename: string,
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

import * as child_process from "child_process";
import * as fs from "fs";
import { promisify } from "util";
import { file } from "tmp-promise";

export async function fetchDotFromBgv(
  filename: string,
  phase: number | string
): Promise<Dot> {
  const exec = promisify(child_process.exec);
  const readFile = promisify(fs.readFile);

  const { path, cleanup } = await file({ postfix: ".dot" });

  try {
    const { stderr } = await exec(
      `seafoam ${filename}:${phase} render --out ${path}`
    );

    if (stderr) {
      throw stderr;
    }

    const buffer = await readFile(path);

    return buffer.toString("utf-8");
  } finally {
    cleanup();
  }
}

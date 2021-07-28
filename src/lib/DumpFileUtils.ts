function extractMethodNameFromBgvFilename(filename: DumpFileName): string {
  const match = filename.match(/\[(.+)\]/)[1];
  let newName = match || filename;

  // This is a rough heuristic that seems to hold up, at least with regards
  // to files from Graal. However, the real information is embedded in the
  // file and we do not have it at this point.
  if (filename.endsWith("_1.bgv")) {
    newName += " (AST)";
  }

  return newName;
}

export function createDumpFile(
  directoryName: DumpDirectoryName,
  filename: DumpFileName
): DumpFile {
  return {
    directory: directoryName,
    filename: filename,
    id: `${directoryName}/${filename}`,
    name: extractMethodNameFromBgvFilename(filename),
  };
}

declare module "app" {
  import { Map } from "immutable";

  global {
    interface DumpFile {
      directory: string;
      filename: string;
      id: string;
      name: string;
    }

    type Dot = string;
    type DumpDirectoryName = string;
    type DumpFileName = string;
    type DumpFilePath = string;
    type DumpDirectoryMap = Map<DumpDirectoryName, DumpFile[]>;

    type Nullable<T> = T | null;
    type Option<T> = T | undefined;
  }
}

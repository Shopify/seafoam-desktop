declare module "app" {
  import { Map } from "immutable";
  import ExecException from "child_process";

  global {
    interface CompilerPhase {
      filename: DumpFileName;
      method: string;
      name: string;
      number: number;
      type: string;
    }

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

    interface SeafoamCommandException extends ExecException.ExecException {
      stderr: string | Buffer;
      stdout: string | Buffer;
    }
  }
}

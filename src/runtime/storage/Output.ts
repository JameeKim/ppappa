import { DataStorageError } from "./DataStorageError";
import { IOutput } from "./types";

export interface IOutputOption {
  content?: number[];
  outputFunction?: (...args: string[]) => void;
}

const defaultOptions: Required<IOutputOption> = {
  content: [],
  outputFunction: console.log,
};

export class Output implements IOutput {
  protected buffer: number[];
  protected readonly options: Required<IOutputOption>;

  public constructor(options: IOutputOption = {}) {
    this.options = { ...defaultOptions, ...options };
    if (options.content) {
      if (!Array.isArray(options.content) || options.content.some((maybeNumber) => typeof maybeNumber !== "number")) {
        throw new DataStorageError("Data for an output should be an array of numbers only");
      }
      this.buffer = options.content.slice(0);
    } else {
      this.buffer = [];
    }
  }

  public put(value: number): void {
    this.buffer.push(value);
  }

  public flush(): void {
    this.options.outputFunction(String.fromCodePoint(...this.buffer));
    this.buffer = [];
  }

  public rawContent(): number[] {
    return this.buffer.slice(0);
  }

  public contentToJSON(): string {
    return JSON.stringify(this.buffer);
  }
}

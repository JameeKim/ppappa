import { IOutput } from "./types";

export class Output implements IOutput {
  protected buffer: number[];

  public constructor(content?: number[]) {
    if (content) {
      if (!Array.isArray(content) || content.some((maybeNumber) => typeof maybeNumber !== "number")) {
        // TODO error
        throw new Error();
      } else {
        this.buffer = content;
      }
    } else {
      this.buffer = [];
    }
  }

  public put(value: number): void {
    this.buffer.push(value);
  }

  public flush(): void {
    console.log(String.fromCodePoint(...this.buffer));
    this.buffer = [];
  }

  public rawContent(): number[] {
    return this.buffer.slice(0);
  }

  public contentToJSON(): string {
    return JSON.stringify(this.buffer);
  }
}

import { RuntimeError } from "../RuntimeError";
import { DataStorageError } from "./DataStorageError";
import { IStorage } from "./types";

export class Stack implements IStorage {
  protected readonly data: number[];

  public constructor(data?: number[]) {
    if (data) {
      if (!Array.isArray(data) || data.some((maybeNumber) => typeof maybeNumber !== "number")) {
        throw new DataStorageError("Data for a stack should be an array of numbers only");
      }
      this.data = data.slice(0);
    } else {
      this.data = [];
    }
  }

  public insert(): void {
    this.data.push(0);
  }

  public retrieve(): number | undefined {
    return this.data.pop();
  }

  public add(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried addition when stack is empty");
    }
    this.data[this.data.length - 1]++;
  }

  public sub(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried subtraction when stack is empty");
    }
    this.data[this.data.length - 1]--;
  }

  public mul(): void {
    const l: number = this.data.length;
    if (!l) {
      throw new RuntimeError("Tried multiplication when stack is empty");
    }
    this.data[l - 1] = this.data[l - 1] * 2;
  }

  public div(): void {
    const l: number = this.data.length;
    if (!l) {
      throw new RuntimeError("Tried division when stack is empty");
    }
    this.data[l - 1] = Math.floor(this.data[l - 1] / 2);
  }

  public switch(): void {
    const l: number = this.data.length;
    if (l < 2) {
      return;
    }
    const { top, second } = { top: this.data[l - 1], second: this.data[l - 2] };
    this.data[l - 1] = second;
    this.data[l - 2] = top;
  }

  public rawData(): number[] {
    return this.data.slice(0);
  }

  public dataToJSON(): string {
    return JSON.stringify(this.data);
  }
}

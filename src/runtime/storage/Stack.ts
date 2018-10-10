import { RuntimeError } from "../RuntimeError";
import { DataStorage } from "./DataStorage";
import { IStorage } from "./types";

export class Stack extends DataStorage implements IStorage {
  get currentValue(): number | undefined {
    return this.data.length ? this.data[this.data.length - 1] : undefined;
  }

  public constructor(data?: number[]) {
    super(data);
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
}

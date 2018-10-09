import { RuntimeError } from "../RuntimeError";
import { DataStorageError } from "./DataStorageError";
import { IStorage } from "./types";

export class Queue implements IStorage {
  protected readonly data: number[];

  public constructor(data?: number[]) {
    if (data) {
      if (!Array.isArray(data) || data.some((maybeNumber) => typeof maybeNumber !== "number")) {
        throw new DataStorageError("Data for a queue should be an array of numbers only");
      } else {
        this.data = data;
      }
    } else {
      this.data = [];
    }
  }

  public insert(): void {
    this.data.push(0);
  }

  public retrieve(): number | undefined {
    return this.data.shift();
  }

  public add(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried addition when queue is empty");
    }
    this.data[0]++;
  }

  public sub(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried subtraction when queue is empty");
    }
    this.data[0]--;
  }

  public mul(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried multiplication when queue is empty");
    }
    this.data[0] = this.data[0] * 2;
  }

  public div(): void {
    if (!this.data.length) {
      throw new RuntimeError("Tried division when queue is empty");
    }
    this.data[0] = Math.floor(this.data[0] / 2);
  }

  public switch(): void {
    if (this.data.length < 2) {
      return;
    }
    const { first, second } = { first: this.data[0], second: this.data[1] };
    this.data[0] = second;
    this.data[1] = first;
  }

  public rawData(): number[] {
    return this.data.slice(0);
  }

  public dataToJSON(): string {
    return JSON.stringify(this.data);
  }
}

import { IStorage } from "./types";

export class Queue implements IStorage {
  protected readonly data: number[];

  public constructor(data?: number[]) {
    if (data) {
      if (!Array.isArray(data) || data.some((maybeNumber) => typeof maybeNumber !== "number")) {
        // TODO error
        throw new Error();
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
      // TODO error
      throw new Error();
    }
    this.data[0]++;
  }

  public sub(): void {
    if (!this.data.length) {
      // TODO error
      throw new Error();
    }
    this.data[0]--;
  }

  public mul(): void {
    if (!this.data.length) {
      // TODO error
      throw new Error();
    }
    this.data[0] = this.data[0] * 2;
  }

  public div(): void {
    if (!this.data.length) {
      // TODO error
      throw new Error();
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

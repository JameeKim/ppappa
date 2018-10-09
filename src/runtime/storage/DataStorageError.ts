// istanbul ignore file

import { PpappaError } from "../../PpappaError";

export class DataStorageError extends PpappaError {
  get message(): string {
    return `[Ppappa] Data Storage: ${this.messageInternal || "Error"}`;
  }
}

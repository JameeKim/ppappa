// istanbul ignore file

import { PpappaError } from "../../PpappaError";

export class UnknownNodeError extends PpappaError {
  get message(): string {
    return `[Ppappa] Unknown Node: ${this.messageInternal || "Error"}`;
  }
}

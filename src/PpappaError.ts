export class PpappaError extends Error {
  protected messageInternal: string;

  get message(): string {
    return `[Ppappa] ${this.messageInternal}`;
  }
  set message(newMsg: string) {
    this.messageInternal = newMsg || "Error";
  }

  get internalMessage(): string {
    return this.messageInternal;
  }

  public constructor(message?: string) {
    super();
    this.messageInternal = message || "Error";
  }
}

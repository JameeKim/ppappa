import { AstDirectionNode, parse } from "../compiler/language";
import { execute, generateSrc } from "./execution";
import { IExecuteOption } from "./execution/execute";
import { DataContainer } from "./storage";

export interface IProgramOptions {
  autoInit?: boolean;
  initScript?: string | Buffer;
  executionOptions?: IExecuteOption;
}

const defaultOptions: Required<IProgramOptions> = Object.freeze({
  autoInit: true,
  initScript: "",
  executionOptions: {},
});

export class Program {
  protected readonly astLog: AstDirectionNode[] = [];
  protected initialized: boolean = false;
  protected container!: DataContainer;
  protected optionsInternal: Required<IProgramOptions>;

  get data(): DataContainer {
    return this.container;
  }

  get options(): Required<IProgramOptions> {
    return this.optionsInternal;
  }

  public constructor(options: IProgramOptions = {}) {
    this.optionsInternal = { ...defaultOptions, ...options };
    if (this.optionsInternal.autoInit) {
      this.init(this.optionsInternal.initScript);
    }
  }

  public init(initScript?: string | Buffer): void {
    if (this.initialized) {
      return;
    }
    this.container = new DataContainer();
    this.initialized = true;
    const initScr = initScript || this.optionsInternal.initScript;
    if (initScr) {
      this.execute(initScr, this.optionsInternal.executionOptions);
    }
  }

  public execute(src: string | Buffer, options: IExecuteOption = {}): void {
    const ast = parse(src, { ...this.optionsInternal.executionOptions.parseOptions, ...options });
    this.astLog.push(...ast);
    execute(this.container, ast, { ...this.optionsInternal.executionOptions, ...options });
  }

  public generateInitScript(): string {
    return generateSrc(this.container);
  }
}

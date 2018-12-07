import { AstDirectionNode, AstNodeType, parse } from "../../compiler/language";
import { IParseOption } from "../../compiler/language/parse";
import { RuntimeError } from "../RuntimeError";
import { DataContainer } from "../storage";
import { UnknownNodeError } from "./UnknownNodeError";

export interface IExecuteOption {
  maxRecursion?: number;
  maxLoop?: number;
  parseOptions?: IParseOption;
}

const defaultOptions: Required<IExecuteOption> = Object.freeze({
  maxRecursion: 1000,
  maxLoop: 1000000,
  parseOptions: {},
});

export function execute(
  data: DataContainer,
  src: string | Buffer | AstDirectionNode[],
  options: IExecuteOption = {},
): void {
  if (!Array.isArray(src)) {
    src = parse(src, options.parseOptions);
  }

  for (const direction of src) {
    recursiveExecution(data, direction, 0, { ...defaultOptions, ...options });
  }
}

function recursiveExecution(
  data: DataContainer,
  direction: AstDirectionNode,
  recursion: number,
  options: Required<IExecuteOption>,
): void {
  if (recursion > options.maxRecursion) {
    throw new RuntimeError(`Recursion too deep; exceeded ${options.maxRecursion}`);
  }

  switch (direction.type) {
    case AstNodeType.CONTROL:
      let repeated: number = 0;
      while (data.currentValue) {
        for (const d of direction.repeat) {
          recursiveExecution(data, d, recursion + 1, options);
        }
        if (repeated++ > options.maxLoop) {
          throw new RuntimeError(`Loop called more than maximum; exceeded ${options.maxLoop}`);
        }
      }
      break;

    case AstNodeType.POINTER:
      data.movePointer(direction.direction === "right" ? 1 : -1);
      break;

    case AstNodeType.POSITIONING:
      data[direction.action]();
      break;

    case AstNodeType.MATHOP:
      switch (direction.operation) {
        case "+":
          data.add();
          break;

        case "-":
          data.sub();
          break;

        case "*":
          data.mul();
          break;

        case "/":
          data.div();
          break;

        default:
          throw new UnknownNodeError(
            // @ts-ignore: direction is a type of never
            `Unknown node of type "${direction.type}" with operation "${direction.operation}"`,
          );
      }
      break;

    case AstNodeType.FLUSH:
      data.flush();
      break;

    default:
      throw new UnknownNodeError(`Unknown node of type "${(direction as any).type}"`);
  }
}

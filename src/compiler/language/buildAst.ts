import { AstDirectionNode, AstNodeType, ControlNode, FlushNode, MathOpNode, PointerNode, PositioningNode } from "./ast";
import { Token, TokenType } from "./token";

export function buildAst(tokens: Token[]): AstDirectionNode[] {
  // all token lists should end with eof token
  if (tokens[tokens.length - 1].type !== TokenType.EOF) {
    // TODO error
    throw new Error();
  }

  return processTokens(tokens, 0).directions;
}

function processTokens(
  tokens: Token[],
  index: number,
  insideControl: boolean = false,
): { directions: AstDirectionNode[], nextIndex: number } {
  const directions: AstDirectionNode[] = [];
  const l: number = tokens.length;
  --index;

  while (++index < l) {
    if (tokens[index].type === TokenType.EOF) {
      if (insideControl) {
        // TODO error
        throw new Error();
      }
      break;
    }

    if (tokens[index].type === TokenType.REPEAT) {
      if (!insideControl) {
        // TODO error
        throw new Error();
      }
      break;
    }

    switch (tokens[index].type) {
      case TokenType.POINT_R:
        directions.push({ type: AstNodeType.POINTER, direction: "right", token: tokens[index] } as PointerNode);
        break;

      case TokenType.POINT_L:
        directions.push({ type: AstNodeType.POINTER, direction: "left", token: tokens[index] } as PointerNode);
        break;

      case TokenType.INSERT:
        directions.push({ type: AstNodeType.POSITIONING, action: "insert", token: tokens[index] } as PositioningNode);
        break;

      case TokenType.RETRIEVE:
        directions.push({ type: AstNodeType.POSITIONING, action: "retrieve", token: tokens[index] } as PositioningNode);
        break;

      case TokenType.SWITCH:
        directions.push({ type: AstNodeType.POSITIONING, action: "switch", token: tokens[index] } as PositioningNode);
        break;

      case TokenType.PRINT:
        directions.push({ type: AstNodeType.POSITIONING, action: "print", token: tokens[index] } as PositioningNode);
        break;

      case TokenType.ADD:
        directions.push({ type: AstNodeType.MATHOP, operation: "+", token: tokens[index] } as MathOpNode);
        break;

      case TokenType.SUB:
        directions.push({ type: AstNodeType.MATHOP, operation: "-", token: tokens[index] } as MathOpNode);
        break;

      case TokenType.MUL:
        directions.push({ type: AstNodeType.MATHOP, operation: "*", token: tokens[index] } as MathOpNode);
        break;

      case TokenType.DIV:
        directions.push({ type: AstNodeType.MATHOP, operation: "/", token: tokens[index] } as MathOpNode);
        break;

      case TokenType.SKIP:
        const res = processTokens(tokens, index + 1, true);
        directions.push({
          type: AstNodeType.CONTROL,
          repeat: res.directions,
          startToken: tokens[index],
          endToken: tokens[res.nextIndex],
        } as ControlNode);
        index = res.nextIndex;
        break;

      case TokenType.FLUSH:
        directions.push({ type: AstNodeType.FLUSH, token: tokens[index] } as FlushNode);
        break;

      case TokenType.COMMENT:
        break;

      default:
        // TODO throw error
        break;
    }
  }

  return { directions, nextIndex: index };
}

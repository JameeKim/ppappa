import { AstDirectionNode, AstNodeType } from "./ast";

export function print(astNodes: AstDirectionNode[]): string {
  return astNodes.reduce((prev, curr) => prev + printDirection(curr), "");
}

function printDirection(node: AstDirectionNode): string {
  if (node.type !== AstNodeType.CONTROL) {
    return node.token.value;
  }

  let str: string = node.startToken.value;

  for (const direction of node.repeat) {
    str += printDirection(direction);
  }

  str += node.endToken.value;

  return str;
}

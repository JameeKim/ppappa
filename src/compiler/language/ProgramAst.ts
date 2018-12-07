import { AstDirectionNode, AstNodeType, ControlNode, PointerNode } from "./ast";

export class ProgramAst {
  public constructor(public readonly directions: AstDirectionNode[]) {}

  public format(): string {
    return this.print(this.directions);
  }

  private print(nodes: AstDirectionNode[]): string {
    let output: string = "";

    for (let i: number = 0; i < nodes.length; i++) {
      switch (nodes[i].type) {
        case AstNodeType.POINTER:
          output += (nodes[i] as PointerNode).token.value;
          if (i + 1 < nodes.length && nodes[i].type !== AstNodeType.POINTER) {
            output += "\n";
          }
          break;

        case AstNodeType.CONTROL:
          const node: ControlNode = (nodes[i] as ControlNode);
          output += `\n${node.startToken.value}`;
          // check if first is control node or not
          output += this.print(node.repeat);
          output += `\n${node.endToken.value}`;
      }
    }

    return output;
  }
}

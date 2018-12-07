import { AstDirectionNode, print } from "../../compiler/language";
import {
  addDirection,
  AstNodeType,
  insertDirection,
  multiplyDirection,
  pointerLeftDirection,
  pointerRightDirection,
  printDirection,
  retrieveDirection,
  subtractDirection,
} from "../../compiler/language/ast";
import { repeatToken, skipToken } from "../../compiler/language/token";
import { DataContainer } from "../storage";

export function generateSrc(data: DataContainer): string {
  const directions: AstDirectionNode[] = [];

  for (const outputNum of data.rawContent()) {
    directions.push(...numToDirection(outputNum));
    directions.push(printDirection);
  }

  const rawData: number[][] = data.rawData().reverse();

  for (const num of rawData[0]) {
    directions.push(
      ...numToDirection(num),
      pointerLeftDirection,
      insertDirection,
      pointerRightDirection,
      {
        type: AstNodeType.CONTROL,
        startToken: skipToken,
        endToken: repeatToken,
        repeat: [subtractDirection, pointerLeftDirection, addDirection, pointerRightDirection],
      },
      retrieveDirection,
    );
  }

  directions.push(pointerLeftDirection);

  for (const stack of rawData.slice(1)) {
    directions.push(pointerLeftDirection);
    for (const num of stack) {
      directions.push(...numToDirection(num));
    }
  }

  const result = print(directions);

  return result.endsWith("끄어끄어끄어끄어끄어끄어끄어끄어") ? result.substring(0, result.length - 16) : result;
}

function numToDirection(num: number): AstDirectionNode[] {
  const directions: AstDirectionNode[] = [insertDirection];

  if (num === 0) {
    return directions;
  }

  const negative: boolean = num < 0;

  const bi: boolean[] = (Math.abs(num).toString(2).split("") as Array<"0" | "1">).map((str) => str === "1");

  bi.forEach((add, idx) => {
    if (!idx) {
      directions.push(negative ? subtractDirection : addDirection);
    } else if (add) {
      directions.push(addDirection);
    }
    directions.push(multiplyDirection);
  });
  directions.pop();

  return directions;
}

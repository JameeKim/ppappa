import { expect } from "chai";
import { AstDirectionNode, AstNodeType } from "./ast";
import { buildAst } from "./buildAst";
import { getTokens } from "./getTokens";
import { TokenType } from "./token";

interface ITestCases {
  [value: string]: AstDirectionNode[];
}

function runTestCases(testCases: ITestCases): void {
  for (const value in testCases) {
    if (testCases.hasOwnProperty(value)) {
      const tokens = testCases[value];
      it(`parse "${convertNewline(value)}"`, function() {
        expect(buildAst(getTokens(value))).to.deep.eq(tokens);
      });
    }
  }

  function convertNewline(str: string): string {
    return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  }
}

/**
 * suite: "Source Code Parsing"
 *
 * TODO add more tests
 */
export function testBuildAst() {
  describe("#buildAst", function() {
    describe("- Without flow-control", function() {
      runTestCases({
        "느아므아쁘아쁘아쁘아뜨어_ (○_○)_P": [
          {
            type: AstNodeType.POSITIONING,
            action: "insert",
            token: { type: TokenType.INSERT, value: "느아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "+",
            token: { type: TokenType.ADD, value: "므아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "*",
            token: { type: TokenType.MUL, value: "쁘아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "*",
            token: { type: TokenType.MUL, value: "쁘아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "*",
            token: { type: TokenType.MUL, value: "쁘아" },
          },
          {
            type: AstNodeType.POSITIONING,
            action: "print",
            token: { type: TokenType.PRINT, value: "뜨어" },
          },
          {
            type: AstNodeType.FLUSH,
            token: { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          },
        ],
      });
    });

    describe("- With flow-control", function() {
      runTestCases({
        "느아므아 끄아 느아므아쁘아쁘아므아\n# 두 숫자를 더한다\r\n으아\r므어 끄어 므아 끄아\n으어\r\n끄어 뜨어\r_ (○_○)_P\n": [
          {
            type: AstNodeType.POSITIONING,
            action: "insert",
            token: { type: TokenType.INSERT, value: "느아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "+",
            token: { type: TokenType.ADD, value: "므아" },
          },
          {
            type: AstNodeType.POINTER,
            direction: "right",
            token: { type: TokenType.POINT_R, value: "끄아" },
          },
          {
            type: AstNodeType.POSITIONING,
            action: "insert",
            token: { type: TokenType.INSERT, value: "느아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "+",
            token: { type: TokenType.ADD, value: "므아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "*",
            token: { type: TokenType.MUL, value: "쁘아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "*",
            token: { type: TokenType.MUL, value: "쁘아" },
          },
          {
            type: AstNodeType.MATHOP,
            operation: "+",
            token: { type: TokenType.ADD, value: "므아" },
          },
          {
            type: AstNodeType.CONTROL,
            repeat: [
              {
                type: AstNodeType.MATHOP,
                operation: "-",
                token: { type: TokenType.SUB, value: "므어" },
              },
              {
                type: AstNodeType.POINTER,
                direction: "left",
                token: { type: TokenType.POINT_L, value: "끄어" },
              },
              {
                type: AstNodeType.MATHOP,
                operation: "+",
                token: { type: TokenType.ADD, value: "므아" },
              },
              {
                type: AstNodeType.POINTER,
                direction: "right",
                token: { type: TokenType.POINT_R, value: "끄아" },
              },
            ],
            startToken: { type: TokenType.SKIP, value: "으아" },
            endToken: { type: TokenType.REPEAT, value: "으어" },
          },
          {
            type: AstNodeType.POINTER,
            direction: "left",
            token: { type: TokenType.POINT_L, value: "끄어" },
          },
          {
            type: AstNodeType.POSITIONING,
            action: "print",
            token: { type: TokenType.PRINT, value: "뜨어" },
          },
          {
            type: AstNodeType.FLUSH,
            token: { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          },
        ],
      });
    });
  });
}

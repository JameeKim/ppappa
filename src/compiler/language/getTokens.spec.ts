import { expect } from "chai";
import { getTokens } from "./getTokens";
import { Token, TokenType } from "./token";

interface ITestCases {
  [value: string]: Token[];
}

function runTestCases(testCases: ITestCases): void {
  for (const value in testCases) {
    if (testCases.hasOwnProperty(value)) {
      const tokens = testCases[value];
      it(`parse "${convertNewline(value)}"`, function() {
        expect(getTokens(value)).to.deep.eq(tokens);
      });
    }
  }

  function convertNewline(str: string): string {
    return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  }
}

/**
 * suite: "Source Code Parsing"
 */
export function testGetTokens() {
  describe("#getTokens", function() {
    describe("- Individually parse", function() {
      runTestCases({
        "끄아": [
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "끄어": [
          { type: TokenType.POINT_L, value: "끄어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "느아": [
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "느어": [
          { type: TokenType.RETRIEVE, value: "느어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "므아": [
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "므어": [
          { type: TokenType.SUB, value: "므어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "쁘아": [
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "쁘어": [
          { type: TokenType.DIV, value: "쁘어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "뜨아": [
          { type: TokenType.SWITCH, value: "뜨아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "뜨어": [
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "으아": [
          { type: TokenType.SKIP, value: "으아" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "으어": [
          { type: TokenType.REPEAT, value: "으어" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "_ (○_○)_P": [
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "# line comment\n": [
          { type: TokenType.COMMENT, value: "# line comment" },
          { type: TokenType.EOF, value: "\0" },
        ],
      });
    });

    describe("- Without spaces", function() {
      runTestCases({
        "느아므아쁘아쁘아쁘아뜨어_ (○_○)_P": [
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "느아므아끄아느아므아쁘아쁘아므아으아므어끄어므아끄아으어끄어뜨어_ (○_○)_P": [
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.SKIP, value: "으아" },
          { type: TokenType.SUB, value: "므어" },
          { type: TokenType.POINT_L, value: "끄어" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.REPEAT, value: "으어" },
          { type: TokenType.POINT_L, value: "끄어" },
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.EOF, value: "\0" },
        ],
        "느아므아쁘아쁘아쁘아쁘아쁘아뜨어_ (○_○)_P느아므아쁘아쁘아쁘아쁘아쁘아뜨어_ (○_○)_P": [
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.EOF, value: "\0" },
        ],
      });
    });

    describe("- With spaces", function() {
      runTestCases({
        "느아므아 끄아 느아므아쁘아쁘아므아\n# 두 숫자를 더한다\r\n으아\r므어 끄어 므아 끄아\n으어\r\n끄어 뜨어\r_ (○_○)_P\n": [
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.COMMENT, value: "# 두 숫자를 더한다" },
          { type: TokenType.SKIP, value: "으아" },
          { type: TokenType.SUB, value: "므어" },
          { type: TokenType.POINT_L, value: "끄어" },
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.REPEAT, value: "으어" },
          { type: TokenType.POINT_L, value: "끄어" },
          { type: TokenType.PRINT, value: "뜨어" },
          { type: TokenType.FLUSH, value: "_ (○_○)_P" },
          { type: TokenType.EOF, value: "\0" },
        ],
      });
    });
  });
}

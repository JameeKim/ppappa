export enum TokenType {
  EOF = "end of file",
  POINT_R = "move pointer right",
  POINT_L = "move pointer left",
  INSERT = "insert 0",
  RETRIEVE = "pull out",
  ADD = "add 1",
  SUB = "subtract 1",
  MUL = "multiply 2",
  DIV = "divide by 2",
  SWITCH = "switch two from top or front",
  PRINT = "move to output",
  SKIP = "skip of 0",
  REPEAT = "repeat if not 0",
  FLUSH = "flush output",
}

export interface IToken {
  type: TokenType;
  value: string;
}

export interface IParseOptions {
  locale: string;
}

/**
 * Change source code input into an array of tokens
 */
export function parse(src: string | Buffer, options: Partial<IParseOptions> = {}): IToken[] {
  if (src instanceof Buffer) {
    src = src.toString();
  }

  const tokens: IToken[] = [];

  let i: number = -1;
  const l: number = src.length;

  while (++i < l) {
    switch (src[i]) {
      case " ":
      case "\n":
      case "\r":
        break;

      case "끄":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.POINT_R, value: "끄아" },
          { type: TokenType.POINT_L, value: "끄어" },
        );
        break;

      case "느":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.INSERT, value: "느아" },
          { type: TokenType.RETRIEVE, value: "느어" },
        );
        break;

      case "므":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.ADD, value: "므아" },
          { type: TokenType.SUB, value: "므어" },
        );
        break;

      case "쁘":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.MUL, value: "쁘아" },
          { type: TokenType.DIV, value: "쁘어" },
        );
        break;

      case "뜨":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.SWITCH, value: "뜨아" },
          { type: TokenType.PRINT, value: "뜨어" },
        );
        break;

      case "으":
        secondCharacter(
          src[++i],
          i,
          { type: TokenType.SKIP, value: "으아" },
          { type: TokenType.REPEAT, value: "으어" },
        );
        break;

      case "_":
        const str: string = src.substr(i, 9);
        if (str === "_ (○_○)_P") {
          tokens.push({ type: TokenType.FLUSH, value: "_ (○_○)_P" });
        } else {
          unknownCharacter(str, i);
        }
        i += 8;
        break;

      default:
        unknownCharacter(src[i], i);
    }
  }

  tokens.push({ type: TokenType.EOF, value: "\0" });

  return tokens;

  /**
   * Push the appropriate token depending on the second character, being "아" or "어"
   */
  function secondCharacter(char: string, position: number, tokenForAh: IToken, tokenForUh: IToken): void {
    switch (char) {
      case "아":
        tokens.push(tokenForAh);
        break;

      case "어":
        tokens.push(tokenForUh);
        break;

      default:
        unknownCharacter(char, position);
    }
  }

  /**
   * Throw an error for wrong character input
   * @throws Error
   */
  function unknownCharacter(char: string, position: number): void {
    throw new Error(`wrong char "${char}" at ${position}`);
  }
}

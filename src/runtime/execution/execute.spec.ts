import { expect } from "chai";
import { AstDirectionNode } from "../../compiler/language";
import { PpappaError } from "../../PpappaError";
import { DataContainer, IDataContainerConstructorOption, IDataContainerState } from "../storage";
import { execute, IExecuteOption } from "./execute";

interface ITestCase {
  name: string;
  initState?: IDataContainerConstructorOption;
  src?: string | Buffer | AstDirectionNode[];
  executionOptions?: IExecuteOption;
  expected?: IDataContainerState;
  throws?: { error: PpappaError, message: string };
}

function runTestCases(testCases: ITestCase[]): void {
  for (const { name, initState, src, executionOptions, expected, throws } of testCases) {
    if (src === undefined) {
      it(name);
    } else {
      it(name, function() {
        const data = new DataContainer(initState);
        if (expected) {
          execute(data, src, executionOptions);
          expect(data.rawState()).to.deep.eq(expected);
        } else if (throws) {
          expect(() => execute(data, src, executionOptions)).to.throw(throws.error, throws.message);
        }
      });
    }
  }
}

const emptyState: IDataContainerState = {
  data: [[], [], [], [], [], [], [], []],
  outputContent: [],
};

export function testExecute(): void {
  describe("#execute", function() {
    describe("- Empty source", function() {
      runTestCases([
        {
          name: "string",
          src: "",
          expected: emptyState,
        },
        {
          name: "buffer",
          src: Buffer.from(""),
          expected: emptyState,
        },
        {
          name: "array of nodes",
          src: [],
          expected: emptyState,
        },
        {
          name: "string with initial state",
          initState: {
            data: [[1], [], [], [2, 3], [], [4, 5], [], []],
            content: [6, 7, 8],
          },
          src: "",
          expected: {
            data: [[1], [], [], [2, 3], [], [4, 5], [], []],
            outputContent: [6, 7, 8],
          },
        },
      ]);
    });

    describe("- Without control directions", function() {
      runTestCases([
        {
          name: "data in a stack",
          src: "느아느아느어느아므아느아므아쁘아느아므아쁘아쁘아므어느아므아쁘아쁘아므아쁘어느아므아느어",
          expected: {
            data: [[0, 1, 2, 3, 2], [], [], [], [], [], [], []],
            outputContent: [],
          },
        },
        {
          name: "data in the queue",
          initState: {
            data: [[0, 1, 2, 3, 2], [], [], [], [], [], [], []],
          },
          src: "흐어흐어흐어흐어흐어끄어느어느아쁘아",
          expected: {
            data: [[], [], [], [], [], [], [], [6, 2, 1, 0, 0]],
            outputContent: [],
          },
        },
        {
          name: "insert some data",
          src: "느아므아쁘아쁘아느아므아쁘아므아크아흐아흐아끄아흐아끄어흐아끄아끄아흐아끄어크아흐아끄아흐아끄아느아므아쁘아쁘아므아크아흐아끄아흐아"
            + "끄아흐아끄아흐아끄아쁘아므아므아끄어끄어느아므아크아흐아끄아흐아끄아흐어",
          expected: {
            data: [[], [3, 4], [], [3, 4, 5], [], [1], [12], [1]],
            outputContent: [],
          },
        },
      ]);
    });

    describe.only("- With control directions", function() {
      runTestCases([
        {
          name: "print \"Hello, world!\"",
          src: "끄아느아므아쁘아쁘아쁘아쁘아쁘아크아흐아쁘아끄아흐아느아므아쁘아므아쁘아쁘아쁘아쁘아쁘아끄어끄어\n"
            + "느아므아쁘아쁘아쁘아끄아크아으아므어끄어므아끄아으어느어끄어흐어\n" // H
            + "느아므아쁘아쁘아므아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // e
            + "느아므아쁘아므아쁘아쁘아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // l
            + "느아므아쁘아므아쁘아쁘아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // l
            + "느아므아쁘아쁘아쁘아쁘아므어끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // o
            + "느아므아쁘아므아쁘아쁘아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어끄어끄어끄어흐어\n" // ,
            + "느아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어끄어끄어끄어흐어\n" // (space)
            + "느아므아쁘아므아쁘아쁘아쁘아므어끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // w
            + "느아므아쁘아쁘아쁘아쁘아므어끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // o
            + "느아므아쁘아쁘아쁘아쁘아므아므아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // r
            + "느아므아쁘아므아쁘아쁘아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // l
            + "느아므아쁘아쁘아끄아끄아크아으아므어끄어끄어므아끄아끄아으어느어끄어끄어흐어\n" // d
            + "느아므아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어끄어끄어끄어흐어\n" // !
            + "끄어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어뜨어", // send to output
          expected: {
            data: [[], [64], [96], [32], [], [], [], []],
            outputContent: [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33],
          },
        },
        {
          name: "print \"안녕\"",
          src: "끄아끄아끄아끄아느아므아쁘아쁘아므아쁘아쁘아므아끄아느아므아쁘아쁘아쁘아므어쁘아쁘아끄아\n" // 21, 28
            + "느아므아쁘아쁘아므아쁘아쁘아므아쁘아므아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아끄어끄어끄어\n" // 44032
            + "",
          expected: {
            data: [[], [], [], [], [21], [28], [44032], []],
            outputContent: [/*50504, 45397*/],
          },
        },
        {
          name: "print \"쁘아쁘아\"",
          src: "끄아끄아끄아끄아느아므아쁘아쁘아므아쁘아쁘아므아끄아느아므아쁘아쁘아쁘아므어쁘아쁘아끄아\n" // 21, 28
            + "느아므아쁘아쁘아므아쁘아쁘아므아쁘아므아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아쁘아끄어끄어끄어\n" // 44032
            + "느아므아쁘아쁘아쁘아크아흐어끄아크아므어" // setup 8(ㅃ) * 21
            + "으아므어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아으어느어끄어끄어느어\n" // 8(ㅃ) * 21
            + "느아므아쁘아쁘아쁘아므아쁘아으아므어끄아므아끄어으어느어끄아\n" // + 18(ㅡ)
            + "크아흐어끄아끄아크아므어으아므어끄어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아끄아으어느어끄어끄어끄어느어\n" // * 28
            + "끄아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어\n" // + 44032
            + "끄어끄어끄어뜨어\n" // print
            + "느아므아쁘아쁘아므아쁘아므아크아흐어끄아크아므어" // setup 11(ㅇ) * 21
            + "으아므어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아으어느어끄어끄어느어끄아\n" // 11(ㅇ) * 21
            + "크아흐어끄아끄아크아므어으아므어끄어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아끄아으어느어끄어끄어끄어느어\n" // * 28
            + "끄아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어\n" // + 44032
            + "끄어끄어끄어뜨어\n" // print
            + "느아므아쁘아쁘아쁘아크아흐어끄아크아므어" // setup 8(ㅃ) * 21
            + "으아므어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아으어느어끄어끄어느어\n" // 8(ㅃ) * 21
            + "느아므아쁘아쁘아쁘아므아쁘아으아므어끄아므아끄어으어느어끄아\n" // + 18(ㅡ)
            + "크아흐어끄아끄아크아므어으아므어끄어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아끄아으어느어끄어끄어끄어느어\n" // * 28
            + "끄아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어\n" // + 44032
            + "끄어끄어끄어뜨어\n" // print
            + "느아므아쁘아쁘아므아쁘아므아크아흐어끄아크아므어" // setup 11(ㅇ) * 21
            + "으아므어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아으어느어끄어끄어느어끄아\n" // 11(ㅇ) * 21
            + "크아흐어끄아끄아크아므어으아므어끄어끄어끄어크아으아므어끄아므아끄어으어느어끄아끄아끄아으어느어끄어끄어끄어느어\n" // * 28
            + "끄아끄아끄아끄아크아으아므어끄어끄어끄어므아끄아끄아끄아으어느어\n" // + 44032
            + "끄어끄어끄어뜨어\n", // print
          expected: {
            data: [[], [], [], [], [21], [28], [44032], []],
            outputContent: [49240, 50500, 49240, 50500],
          },
        },
      ]);
    });
  });
}

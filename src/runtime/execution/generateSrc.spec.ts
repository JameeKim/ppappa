import { expect } from "chai";
import { DataContainer, IDataContainerConstructorOption } from "../storage/index";
import { generateSrc } from "./generateSrc";

function runTestCases(testCases: Array<{ name: string, arg: IDataContainerConstructorOption, str: string }>): void {
  for (const { name, arg, str } of testCases) {
    it(name, function() {
      const data = new DataContainer(arg);
      expect(generateSrc(data)).to.eq(str);
    });
  }
}

export function testGenerateSrc(): void {
  describe("#generateSrc", function() {
    describe("- Empty data", function() {
      runTestCases([
        {
          name: "produce empty string",
          arg: {},
          str: "",
        },
      ]);
    });

    describe("- Content only", function() {
      runTestCases([
        {
          name: "single data",
          arg: { content: [33] },
          str: "느아므아쁘아쁘아쁘아쁘아쁘아므아뜨어",
        },
        {
          name: "multiple data",
          arg: { content: [50504, 45397] },
          str: "느아므아쁘아므아쁘아쁘아쁘아쁘아므아쁘아쁘아므아쁘아쁘아므아쁘아쁘아쁘아므아쁘아쁘아쁘아뜨어느아므아쁘아쁘아므아쁘아므아쁘아쁘아쁘아"
            + "쁘아므아쁘아쁘아므아쁘아쁘아므아쁘아쁘아므아쁘아쁘아므아뜨어",
        },
      ]);
    });

    describe("- Data only", function() {
      runTestCases([
        {
          name: "single data in a single stack",
          arg: { data: [[], [], [6], [], [], [], [], []] },
          str: "끄어끄어끄어끄어끄어끄어느아므아쁘아므아쁘아끄어끄어",
        },
        {
          name: "single data in the queue",
          arg: { data: [[], [], [], [], [], [], [], [10]] },
          str: "느아므아쁘아쁘아므아쁘아으아므어끄어므아끄아으어느어",
        },
        {
          name: "single data in each of multiple places",
          arg: { data: [[2], [], [], [], [], [4], [], [7]] },
          str: "느아므아쁘아므아쁘아므아으아므어끄어므아끄아으어느어끄어끄어끄어느아므아쁘아쁘아끄어끄어끄어끄어끄어느아므아쁘아",
        },
        {
          name: "multiple data all over",
          arg: { data: [[], [4, 9, 0], [], [8], [0, 3], [], [5], [2, 1]] },
          str: "느아므아쁘아으아므어끄어므아끄아으어느어느아므아으아므어끄어므아끄아으어느어끄어끄어느아므아쁘아쁘아므아끄어끄어느아느아므아쁘아므아"
            + "끄어느아므아쁘아쁘아쁘아끄어끄어느아므아쁘아쁘아느아므아쁘아쁘아쁘아므아느아끄어",
        },
      ]);
    });

    describe("- Both content and data", function() {
      runTestCases([
        {
          name: "content first then data",
          arg: {
            content: [17, 0],
            data: [[0], [], [2, 1, 0], [], [], [], [], [2, 1, 0]],
          },
          str: "느아므아쁘아쁘아쁘아쁘아므아뜨어느아뜨어느아므아쁘아으아므어끄어므아끄아으어느어느아므아으아므어끄어므아끄아으어느어느아으아므어끄어"
            + "므아끄아으어느어끄어끄어끄어끄어끄어끄어느아므아쁘아느아므아느아끄어끄어느아",
        },
      ]);
    });

    describe("- Execute the generated source", function() {
      it("not yet");
    });
  });
}

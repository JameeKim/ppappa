import { expect } from "chai";
import { stub } from "sinon";
import { DataStorageError } from "./DataStorageError";
import { Output } from "./Output";

export function testOutput(): void {
  describe("#Output", function() {
    describe("- Construct", function() {
      it("without data", function() {
        const output = new Output();
        // @ts-ignore: access to protected member "buffer"
        expect(output.buffer).to.be.an("array").of.length(0);
      });

      it("with data", function() {
        const output = new Output({ content: [1, 2, 3] });
        // @ts-ignore: access to protected member "buffer"
        expect(output.buffer).to.deep.eq([1, 2, 3]);
      });

      it("data not array", function() {
        // @ts-ignore: arg for Stack constructor should be number[]
        expect(() => new Output("not an array"))
          .to.throw(DataStorageError, "Data for an output should be an array of numbers only");
      });

      it("data array containing non-number", function() {
        // @ts-ignore: arg for Stack constructor should be number[]
        expect(() => new Output([1, 2, "3", 4, 5]))
          .to.throw(DataStorageError, "Data for an output should be an array of numbers only");
      });
    });

    describe("- Showing content", function() {
      let output: Output;

      beforeEach(function() {
        output = new Output({ content: [1, 2, 3] });
      });

      it("raw content should be exactly same to the real content", function() {
        expect(output.rawContent()).to.deep.eq([1, 2, 3]);
      });

      it("raw content is a copy, not the original array", function() {
        const copy = output.rawContent();
        copy[3] = 4;
        expect(copy).to.deep.eq([1, 2, 3, 4]);
        expect(output.rawContent()).to.deep.eq([1, 2, 3]);
      });

      it("JSON output", function() {
        // @ts-ignore: access to protected member "buffer"
        expect(output.contentToJSON()).to.eq(JSON.stringify(output.buffer));
      });
    });

    describe("- Putting into and flushing the buffer", function() {
      let output: Output;

      beforeEach(function() {
        output = new Output();
      });

      it("put the given number", function() {
        output.put(30);
        expect(output.contentToJSON()).to.eq("[30]");
      });

      it("flush the content to the console", function() {
        // TODO do not need to use stub, use spy instead
        const consoleStub = stub(console, "log");
        [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33].forEach((num) => output.put(num));
        output.flush();
        expect(consoleStub).to.be.calledOnceWithExactly("Hello, world!");
        expect(output.contentToJSON()).to.eq("[]");
        consoleStub.restore();
      });
    });
  });
}

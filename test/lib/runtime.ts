import { testDataContainer } from "../../src/runtime/storage/DataContainer.spec";
import { testOutput } from "../../src/runtime/storage/Output.spec";
import { testQueue } from "../../src/runtime/storage/Queue.spec";
import { testStack } from "../../src/runtime/storage/Stack.spec";

describe("Runtime", function() {
  describe("Data Storage", function() {
    testStack();
    testQueue();
    testOutput();
    testDataContainer();
  });
});

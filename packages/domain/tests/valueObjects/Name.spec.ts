/* eslint-disable import/no-extraneous-dependencies */
import {
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";

import { Name } from "../../src/valueObjects";

let invalidName: Name;
let validName: Name;

describe("Name test", () => {
  beforeAll(() => {
    invalidName = new Name({ firstName: "", lastName: "" });
    validName = new Name({ firstName: "John", lastName: "Doe" });
  });
  it("Should return error if name is empty.", () => {
    expect(invalidName.Invalid).toBe(true);
  });

  it("Should return error when name has less then 3 letters", () => {
    expect(invalidName.Invalid).toBe(true);
  });

  it("Should return success when Name is valid.", () => {
    expect(validName.Valid).toBe(true);
  });

  it("Should return full Name.", () => {
    expect(validName.fullName).toBe("John Doe");
  });
});

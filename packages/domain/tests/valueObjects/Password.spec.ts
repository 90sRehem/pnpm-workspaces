/* eslint-disable import/no-extraneous-dependencies */
import {
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";

import { Password } from "../../src/valueObjects";

let invalidPassword: Password;
let validPassword: Password;

describe("Email test", () => {
  beforeAll(() => {
    invalidPassword = new Password({ value: "" });
    validPassword = new Password({ value: "123456" });
  });
  it("Should return error if password is empty.", () => {
    expect(invalidPassword.Invalid).toBe(true);
  });
  it("Should return error if password has less then 6 digits.", () => {
    expect(invalidPassword.Invalid).toBe(true);
  });
  it("Should return success if has valid password.", async () => {
    expect(validPassword.Valid).toBe(true);
  });
  it("Should be able to hash a valid password password.", async () => {
    expect(await validPassword.getHashedValue()).toHaveLength(60);
  });
});

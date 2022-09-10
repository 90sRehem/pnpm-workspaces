/* eslint-disable import/no-extraneous-dependencies */
import {
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";
import { Email } from "../../src/valueObjects";

let invalidEmail: Email;
let validEmail: Email;

describe("Email test", () => {
  beforeAll(() => {
    invalidEmail = new Email({ address: "" });
    validEmail = new Email({ address: "johndoe@email.com" });
  });
  it("Should return error if email is empty.", () => {
    expect(invalidEmail.Invalid).toBe(true);
  });

  it("Should return error when email is invalid", () => {
    expect(invalidEmail.Invalid).toBe(true);
  });

  it("Should return success when email is valid.", () => {
    expect(validEmail.Valid).toBe(true);
  });
});

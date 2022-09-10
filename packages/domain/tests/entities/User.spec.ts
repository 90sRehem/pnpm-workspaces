import {
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";

import { User } from "../../src/entities";
import { Email, Name, Password } from "../../src/valueObjects";

let validUser: User;
let invalidUser: User;
let invalidEmail: Email;
let validEmail: Email;
let invalidPassword: Password;
let validPassword: Password;
let invalidName: Name;
let validName: Name;

describe("User tests", () => {
  beforeAll(() => {
    invalidName = new Name({ firstName: "", lastName: "" });
    validName = new Name({ firstName: "John", lastName: "Doe" });
    invalidPassword = new Password({ value: "" });
    validPassword = new Password({ value: "123456" });
    invalidEmail = new Email({ address: "" });
    validEmail = new Email({ address: "johndoe@email.com" });
    validUser = new User({
      name: validName,
      password: validPassword,
      email: validEmail,
      createdAt: "",
    });

    invalidUser = new User({
      name: invalidName,
      password: invalidPassword,
      email: invalidEmail,
      createdAt: "",
    });
  });

  it("should return success when creating user", () => {
    expect(validUser.Valid).toBe(true);
  });
  it("should return failure when creating user", () => {
    expect(invalidUser.Invalid).toBe(true);
  });
});

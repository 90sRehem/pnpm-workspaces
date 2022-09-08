import {
  InvalidNotificationUsingPropAndMsg,
  InvalidNotificationUsingObject,
  InvalidNotificationUsingObjectArray,
} from "./mocks";

let invalidNotificationUsingPropAndMsg: InvalidNotificationUsingPropAndMsg;
let invalidNotificationUsingObject: InvalidNotificationUsingObject;
let invalidNotificationUsingObjectArray: InvalidNotificationUsingObjectArray;

describe("Notifications tests", () => {
  beforeAll(() => {
    invalidNotificationUsingPropAndMsg =
      new InvalidNotificationUsingPropAndMsg();
    invalidNotificationUsingObject = new InvalidNotificationUsingObject();
    invalidNotificationUsingObjectArray =
      new InvalidNotificationUsingObjectArray();
  });

  it("Should return invalid passing property, message and must contain one notification", () => {
    expect(invalidNotificationUsingPropAndMsg.Invalid).toBe(true);
    expect(invalidNotificationUsingPropAndMsg.GetNotifications).toHaveLength(1);
  });

  it("Should return invalid passing notification object and must contain one notification", () => {
    expect(invalidNotificationUsingObject.Invalid).toBe(true);
    expect(invalidNotificationUsingObject.GetNotifications).toHaveLength(1);
  });
  it("Should return invalid passing an notification array and must contain three notifications", () => {
    expect(invalidNotificationUsingObjectArray.Invalid).toBe(true);
    expect(invalidNotificationUsingObjectArray.GetNotifications).toHaveLength(
      3,
    );
  });
  it("Should return an array with messages", () => {
    expect(invalidNotificationUsingObjectArray.Messages).toHaveLength(3);
  });
});

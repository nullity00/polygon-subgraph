import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address } from "@graphprotocol/graph-ts";
import { AddTag } from "../generated/Tags/Tags";
import { handleAddTag, handleOwnershipTransferred } from "../src/tags";
import {
  createAddTagEvent,
  createOwnershipTransferredEvent,
} from "./tags-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let person = Address.fromString(
      // "0x0000000000000000000000000000000000000001"
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    );
    let tag = "trust";
    let newAddTagEvent = createAddTagEvent(person, tag);
    handleAddTag(newAddTagEvent);
    let person2 = Address.fromString(
      "0xe993486b257cd1481aef74b3b909a2627fc8d305"
    );
    tag = "fraud";
    newAddTagEvent = createAddTagEvent(person2, tag);
    handleAddTag(newAddTagEvent);
    let newOwnershipTransferredEvent = createOwnershipTransferredEvent(
      person,
      person2
    );
    handleOwnershipTransferred(newOwnershipTransferredEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Entity created and stored", () => {
    assert.entityCount("TagCount", 2);
    assert.entityCount("Tag", 2);
    assert.entityCount("Address", 2);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TagCount",
      "0xe993486b257cd1481aef74b3b909a2627fc8d305-fraud",
      "count",
      "1"
    );
    assert.fieldEquals(
      "Address",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "address",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    );
    assert.fieldEquals("Tag", "trust", "name", "trust");
    assert.fieldEquals("Tag", "fraud", "sentiment", "negative");

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});

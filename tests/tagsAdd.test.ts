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
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Entity created and stored", () => {
    assert.entityCount("TagCount", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TagCount",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-trust",
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
    assert.fieldEquals("Tag", "trust", "sentiment", "positive");

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});

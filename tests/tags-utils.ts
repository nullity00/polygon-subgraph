import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { AddTag, DeleteTag, OwnershipTransferred } from "../generated/Tags/Tags"

export function createAddTagEvent(person: Address, tag: string): AddTag {
  let addTagEvent = changetype<AddTag>(newMockEvent())

  addTagEvent.parameters = new Array()

  addTagEvent.parameters.push(
    new ethereum.EventParam("person", ethereum.Value.fromAddress(person))
  )
  addTagEvent.parameters.push(
    new ethereum.EventParam("tag", ethereum.Value.fromString(tag))
  )

  return addTagEvent
}

export function createDeleteTagEvent(person: Address, tag: string): DeleteTag {
  let deleteTagEvent = changetype<DeleteTag>(newMockEvent())

  deleteTagEvent.parameters = new Array()

  deleteTagEvent.parameters.push(
    new ethereum.EventParam("person", ethereum.Value.fromAddress(person))
  )
  deleteTagEvent.parameters.push(
    new ethereum.EventParam("tag", ethereum.Value.fromString(tag))
  )

  return deleteTagEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

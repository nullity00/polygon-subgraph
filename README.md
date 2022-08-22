# Blocq☎️book subgraph

[theGraph](https://thegraph.com/) powered subgraph for indexing public tags on the [Blocqbook](https://blocqbook.netlify.app/) app.

Public tags are meant to indicate good/bad on-chain behavior, flag spam or fraud and indicate the purpose of an address.

## Supported Tags

```js
const validTags = ["friend", "trust", "smrtCntct", "fraud", "spam"];
```

## How to query

EVM wallet addresses will be **lowercased** to avoid dupilcate entities.
This query will return all tags for an EVM address:

```graphql
query Addresses($addressId: ID!) {
  address(id: $addressId) {
    id
    created
    address
    tags {
      id
      tag {
        id
        name
        sentiment
      }
      count
      created
      updated
    }
  }
}
```

```json
args: {
  "addressId": "0x0111"
}
```

## Debug

To retrieve the subgraph errors and debug:

```graphql
query indexingStatuses(subgraphs: theGraphId!) {
    subgraph
    synced
    health
    entityCount
    fatalError {
      handler
      message
      deterministic
      block {
        hash
        number
      }
    }
    chains {
      chainHeadBlock {
        number
      }
      earliestBlock {
        number
      }
      latestBlock {
        number
      }
    }
  }
```

## Access

TheGraph id: QmWiT3PENH3kQujs5QYoKiUE4XXMWryuxqDzwnG4fJqbjv

Endpoint: https://thegraph.com/hosted-service/subgraph/3llobo/blocqbook

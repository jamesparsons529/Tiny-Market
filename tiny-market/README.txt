
# Tiny Market - NFT Marketplace

Tiny Market project is an NFT marketplace operating as a social media platform that uses blockchain and smart contract technology to safely and reliable exchange NFTs for Bitcoin. The marketplace is developed using clarity.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

Ensure you have Visual Studio Code, Node.js installed on your computer and clarity extension.

### Starting the Test Environment

```bash
npm run

```

## Terminal Commands

Following these commands to interact and conduct transactions via the visual studio terminal:

### Listing and Cancelling Sales
#### Create a new nft
```bash (contract-call? .sip009-nft mint tx-sender)```

#### Verify we own the NFT
```bash (contract-call? .sip009-nft get-owner u1)```

#### Whitelist the NFT contract
```bash (contract-call? .tiny-market set-whitelisted .sip009-nft true)```

#### Create a listing for the NFT 
```bash (contract-call? .tiny-market list-asset .sip009-nft {taker: none, token-id: u1, expiry: u500, price: u1000, payment-asset-contract: none})```

#### Retrieve listing
```bash (contract-call? .tiny-market get-listing u0)```

#### Who owns the NFT now
```bash (contract-call? .sip009-nft get-owner u1)```

#### Listing an NFT we don't own
```bash (contract-call? .tiny-market list-asset .sip009-nft {taker: none, token-id: u555, expiry: u500, price: u1000, payment-asset-contract: none})```

#### Cancel the NFT Listing
```bash (contract-call? .tiny-market cancel-listing u0 .sip009-nft)```

#### Verify we have received the NFT back
```bash (contract-call? .sip009-nft get-owner u1)```


### Fulfilling a Listing with STX
#### Create a new nft
```bash (contract-call? .sip009-nft mint tx-sender)```

#### Whitelist the NFT contract
```bash (contract-call? .tiny-market set-whitelisted .sip009-nft true)```

#### Create a listing for the NFT 
```bash (contract-call? .tiny-market list-asset .sip009-nft {taker: none, token-id: u1, expiry: u500, price: u150, payment-asset-contract: none})```

#### Test if we can purchase our own NFT
```bash (contract-call? .tiny-market fulfil-listing-stx u0 .sip009-nft)```

#### Change the tx-sender
```bash ::set_tx_sender ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5```

#### Purchase the NFT
```bash (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tiny-market fulfil-listing-stx u0 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft)```

#### View all assets to confirm purchase
```bash ::get_assets_maps```


### Fulfilling a Listing with FT (amazing-coins)
#### Create a new nft
```bash (contract-call? .sip009-nft mint tx-sender)```

#### Mint some amazing coins into another principal
```bash (contract-call? .sip010-token mint u1000 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5)```

#### Whitelist the amazing-coin payment type
```bash (contract-call? .tiny-market set-whitelisted .sip010-token true)```

#### Create a NFT lisitng with payment-asset-contract (some .sip010-token) (some is used because its optional)
```bash (contract-call? .tiny-market list-asset .sip009-nft {taker: none, token-id: u1, expiry: u500, price: u800, payment-asset-contract: (some .sip010-token)})```

#### Change the tx-sender
```bash ::set_tx_sender ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5```

#### Attempt to purchase NFT with STX instead of amazing-coins
```bash (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tiny-market fulfil-listing-stx u0 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft)```

#### Attempt to purchase NFT with amazing-coins
```bash (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tiny-market fulfil-listing-ft u0 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip010-token)```

#### View all assets to confirm purchase
```bash ::get_assets_maps```

## Authors

- **James Parsons** - [jamesparsons529](https://github.com/jamesparsons529)
- **Elliot Horne** - [Elli0ttH0rne](https://github.com/Elli0ttH0rne)
- **Samaar Bajwa** - [Samaar-Bajwa](https://github.com/Samaar-Bajwa)
- **Alexei Delinicolis** - [MrSkribb](https://github.com/MrSkribb)
- **Yu Wei** - [forever003](https://github.com/forever003)

## Acknowledgments

- The author wishes to express gratitude to Delaware Nonprofit Foundation. Their [Clarity Camp](https://learn.stacks.org/course/clarity-camp) and stacks course greatly facilitated the teams understanding of creating an NFT marketplace.
# Tiny Market - NFT Marketplace

Tiny Market project is an NFT marketplace operating as a social media platform that uses blockchain and smart contract technology to safely and reliable exchange NFTs for STX. The marketplace is developed using clarity.

The current trading on the marketplace runs off the stacks Testnet. It does still display users personal Mainnet assets, however, they are not able to be traded or listed.

## Minting Process
- Users need to be aware that transactions on this site will use funds from there stacks Testnet wallet.
- Users need to be aware that network fees associated with transactions can not be refunded.
- Cost for minting an NFT starts at __ and will very depending on the network speed chosen.

## Clarity Camp Oriented Development
This projects development approach was inspired by the work of Stacks Foundation. 

Learning and development was assisted by the Clarity Camp course which they established to teach the clarity language and how to develop deployable smart contracts.

For more information on the course developed by Stacks Foundation vist here:
```bash
https://learn.stacks.org/
```
## Smart-Contracts
Use the folder 'tiny-market' to find contents for BACKEND code. Within the 'contracts' directory the marketplaces smart contracts and code can be found.

Alternatively deployed versions of the contracts can be found using the below links:
NFT1 Contract:
```bash
_____________
```
NFT2 Contract:
```bash
_____________
```
Tiny-Market Contract:
```bash
_____________
```

### NFT1 Contract
Purpose: This contract mimcs a stacks SIP009 contract and is used to mint NFTs for __ STX

Important Functions:
_________________
_________________
_________________

### NFT1 Contract
Purpose: This contract mimcs a stacks SIP009 contract and is used to mint another NFTs for __ STX

Important Functions:
_________________
_________________
_________________

### Tiny-Market Contract
Purpose: This contract is used to fulfilling listings, purchases and cancelling listings

Important Functions:
_________________
_________________
_________________

## User Interface
Code related to the FRONTEND can be found in frontend-tinymarket.
Javascript with StacksJS is used in FRONTEND development for the following reasons:
- More direct control over interactions with Testnet because of low-level API.
- More developer friendly as had more access to documentation.
- Not pre-configured provided developers with more control over FRONTEND and BACKEND.

## NFT Image Displaying
The images are displayed using ____________.

# Getting Started as a User
Follow these instructions to set up the project on your local machine for marketplace use, along with development and testing if desired.

## Prerequisites
Ensure you have Visual Studio Code, Node.js installed on your computer and clarity extension.

Ensure that you have a valid wallet with Testnet funds along with either the XVerse or Leather extension.
Users are recommended to use Leather to reduce potential complications.

## Starting Marketplace Locally
In Visual Studio open a terminal and navigate to the below directory
```bash 
Tiny-Market\frontend-tinymarket
```
Next run the following
```bash
npm start
```

## Connecting Wallet
**Step 1:** 

User must first click the 'Connect Wallet' button in the navbar.

![Alt text](tiny-market/ui-preview/.png)

**Step 2:** 

Next login to wallet using the pop-up window.

![Alt text](tiny-market/ui-preview/.png)


## Minting NFT
**Step 1:** 

Once logged in, click one of the following buttons to mint an NFT.

![Alt text](tiny-market/ui-preview/.png)


**Step 2:** 

Next using the pop-up window pick a network speed and confirm minting.

![Alt text](tiny-market/ui-preview/.png)


## View Owned Assets
**Step 1:** 

Via the navbar click on 'Profile' to navigate to the wallets profile page.

![Alt text](tiny-market/ui-preview/.png)


**Step 2:** 

Now the wallets Testnet and Mainnet NFTs are viewable.

![Alt text](tiny-market/ui-preview/.png)


## List Owned Asset on Testnet
**Step 1:** 

Via the navbar click on 'AssetSell' to navigate to the asset sell page.

![Alt text](tiny-market/ui-preview/.png)


**Step 2:** 

Next fill the below form, specifying the desired asset to list along with the 'sell price' and 'expiry time' in block height and click continue.

![Alt text](tiny-market/ui-preview/.png)


**Step 3:** 

Next using the pop-up window pick a network speed and confirm the listing.

![Alt text](tiny-market/ui-preview/.png)


## Purchase Asset Using STX
**Step 1:** 

Via the navbar click on 'AssetPurchase' to navigate to the asset sell page.

![Alt text](tiny-market/ui-preview/.png)


**Step 2:** 

Next view the currently listed available NFTs.

![Alt text](tiny-market/ui-preview/.png)


**Step 3:** 

Once desired NFT is chosen, enter the listing ID of the asset which is provided in the listing table. Ensure that the connected wallet contains the correct amount of STX before purchasing and click 'fulfill purchase' button.

![Alt text](tiny-market/ui-preview/.png)


**Step 4:** 

Next using the pop-up window pick a network speed and confirm the purchase.

![Alt text](tiny-market/ui-preview/.png)


## Phase 2
If the project continues the following features will look at being implemented.
_________________
_________________
_________________
_________________

## Authors
- **James Parsons** - [jamesparsons529](https://github.com/jamesparsons529)
- **Elliot Horne** - [Elli0ttH0rne](https://github.com/Elli0ttH0rne)
- **Samaar Bajwa** - [Samaar-Bajwa](https://github.com/Samaar-Bajwa)
- **Alexei Delinicolis** - [MrSkribb](https://github.com/MrSkribb)
- **Yu Wei** - [forever003](https://github.com/forever003)

## Acknowledgments
- The author wishes to express gratitude to Delaware Nonprofit Foundation. Their [Clarity Camp](https://learn.stacks.org/course/clarity-camp) and stacks course greatly facilitated the teams understanding of creating an NFT marketplace.

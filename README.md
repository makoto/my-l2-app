# ERC 3668 L2 Resolver demo

## Pre-requisite

- Setup a gateway server by folllowing https://github.com/corpus-io/ENS-Bedrock-Resolver
- Register a name for the test on Goerli

## Setting up the server

```
gh repo clone makoto/my-l2-app
cd my-l2-app
yarn
yarn start
```

## Walkthrough video

https://drive.google.com/file/d/1DXhjjnvwY12fmLEczFSIqKEmBuNpIC0H/view?usp=sharing

## Reference

- [Technical doc](https://docs.ens.domains/dapp-developer-guide/ens-l2-offchain#l2-resolver)
- [ERC 3668](https://eips.ethereum.org/EIPS/eip-3668)

## TODO

- Fix the problem of not decoding metadata.coinType
- Replace hard coded chainId to the one dynamically fetched from metadata
- Replace hard coded l2 graphql url
- Tidy up code

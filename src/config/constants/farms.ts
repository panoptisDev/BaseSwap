import { serializeTokens } from 'utils/serializeTokens'
import { DEFAULT_CHAIN_ID } from 'utils/providers'
import { ChainId } from '../../../packages/swap-sdk/src/constants'
import { TOKENS_CHAIN_MAP } from './tokens'
import { SerializedFarmConfig } from './types'

export const serializedTokens = serializeTokens(TOKENS_CHAIN_MAP[DEFAULT_CHAIN_ID])

export const CAKE_BNB_LP_MAINNET = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'

const farms: SerializedFarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'BBT-ETH LP',
  //   lpAddresses: {
  //     [ChainId.BASE]: '0xf4b96d5162adee867b6361e9f1848d701c4286c7',
  //   },
  //   token: serializedTokens.bbt,
  //   quoteToken: serializedTokens.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'BSWAP-ETH LP',
    lpAddresses: {
      [ChainId.BASE_GOERLI]: '0x26484B48418581993e538607e305b363c98125CA',
      [ChainId.BASE]: '0xE80B4F755417FB4baF4dbd23C029db3F62786523',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      [ChainId.BASE]: '0x41d160033C222E6f3722EC97379867324567d883',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.usdbc,
  },
  {
    pid: 8,
    lpSymbol: 'MIM-USDC LP',
    lpAddresses: {
      [ChainId.BASE]: '0xa2b120cab75aefdfafda6a14713349a3096eed79',
    },
    token: serializedTokens.mim,
    quoteToken: serializedTokens.usdbc,
  },
  {
    pid: 10,
    lpSymbol: 'USD+-USDC LP',
    lpAddresses: {
      [ChainId.BASE]: '0x696b4d181Eb58cD4B54a59d2Ce834184Cf7Ac31A',
    },
    token: serializedTokens.usdp,
    quoteToken: serializedTokens.usdbc,
  },
  {
    pid: 11,
    lpSymbol: 'DAI+-USDC LP',
    lpAddresses: {
      [ChainId.BASE]: '0x7Fb35b3967798cE8322cC50eF52553BC5Ee4c306',
    },
    token: serializedTokens.daip,
    quoteToken: serializedTokens.usdp,
  },
  {
    pid: 5,
    lpSymbol: 'DAI-USDC LP',
    lpAddresses: {
      [ChainId.BASE]: '0x6D3c5a4a7aC4B1428368310E4EC3bB1350d01455',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.usdbc,
  },
  {
    pid: 9,
    lpSymbol: 'EDE-WETH LP',
    lpAddresses: {
      [ChainId.BASE]: '0x2135780D04C96E14bC205d2c8B8eD4e716d09A2b',
    },
    token: serializedTokens.ede,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'CBETH-ETH LP',
    lpAddresses: {
      [ChainId.BASE]: '0x07CFA5Df24fB17486AF0CBf6C910F24253a674D3',
    },
    token: serializedTokens.cbeth,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'OGRE-ETH LP',
    lpAddresses: {
      [ChainId.BASE_GOERLI]: '0x26484B48418581993e538607e305b363c98125CA',
      [ChainId.BASE]: '0x81a03d61c913bdcc60519423c8841c18ffb752a8',
    },
    token: serializedTokens.ogre,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'axlUSDC-ETH LP',
    lpAddresses: {
      [ChainId.BASE]: '0x9a0b05f3cf748a114a4f8351802b3bffe07100d4',
    },
    token: serializedTokens.axlUsdc,
    quoteToken: serializedTokens.wbnb,
  },

  

  // {
  //   pid: 4,
  //   lpSymbol: 'CBETH-USDBC LP',
  //   lpAddresses: {
  //     [ChainId.BASE]: '0x29a706a49baE714bCfcC96ac1A43e116cB57794c',
  //   },
  //   token: serializedTokens.cbeth,
  //   quoteToken: serializedTokens.usdbc,
  // }, 
]

export default farms

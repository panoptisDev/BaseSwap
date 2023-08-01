import { ChainId } from '@magikswap/sdk'

export interface ITokenInfo {
  coinGeckoId?: string
  name?: string
  symbol?: string
  logoURI?: string
  tokenListKey?: string // key in tokens.ts if needed to join to get a token instance
  addresses: { [chainId: number]: string }
}

export type StableTokenLookupKey = 'FRAX' | 'USDCe' | 'USDT' | 'DAI' | 'USD+' | 'DAI+'
// Add to this list as needed
export type TokenLookupKey =
  | StableTokenLookupKey
  | 'ProtocolToken'
  | 'xProtocolToken'
  | 'WETH'
  | 'WBTC'
  | 'GMX'
  | 'ARB'
  | 'frxETH'
  | 'GNS'
  | 'DAI+'
  | 'USD+'
  | 'CGLD'
  | 'JRT'
  | 'DEUS'
  | 'RDNT'

export type TokenInfoMapping = {
  [key in TokenLookupKey]?: ITokenInfo
}

export const STABLE_TOKEN_INF0: TokenInfoMapping = {
  USDCe: {
    coinGeckoId: 'usd-coin',
    addresses: {
      [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
  },
  WETH: {
    coinGeckoId: 'ethereum',
    addresses: {
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    },
  },
  FRAX: {
    coinGeckoId: 'frax',
    addresses: {
      [ChainId.ARBITRUM]: '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F',
    },
  },
  USDT: {
    coinGeckoId: 'tether',
    addresses: {
      [ChainId.ARBITRUM]: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    },
  },
  DAI: {
    coinGeckoId: 'dai',
    addresses: {
      [ChainId.ARBITRUM]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    },
  },
  'USD+': {
    coinGeckoId: 'usd',
    addresses: {
      [ChainId.ARBITRUM]: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
    },
  },
  'DAI+': {
    coinGeckoId: 'overnight-dai',
    addresses: {
      [ChainId.ARBITRUM]: '0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8',
    },
  },
}

export const TOKEN_INF0: TokenInfoMapping = {
  ...STABLE_TOKEN_INF0,

  ProtocolToken: {
    coinGeckoId: 'arbitrum-exchange',
    addresses: {
      [ChainId.ARBITRUM]: '0xD5954c3084a1cCd70B4dA011E67760B8e78aeE84',
    },
  },
  xProtocolToken: {
    addresses: {
      [ChainId.ARBITRUM]: '0xa954A31137fBe5c2D384A0067DE042bAA58b3403',
    },
  },
  WETH: {
    coinGeckoId: 'ethereum',
    addresses: {
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    },
  },

  WBTC: {
    coinGeckoId: 'wrapped-bitcoin',
    addresses: {
      [ChainId.ARBITRUM]: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    },
  },

  ARB: {
    coinGeckoId: 'arbitrum',
    addresses: {
      [ChainId.ARBITRUM]: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    },
  },

  frxETH: {
    coinGeckoId: 'frax-ether',
    addresses: {
      [ChainId.ARBITRUM]: '0x178412e79c25968a32e89b11f63B33F733770c2A',
    },
  },

  GMX: {
    coinGeckoId: 'gmx',
    addresses: {
      [ChainId.ARBITRUM]: '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F',
    },
  },
  GNS: {
    coinGeckoId: 'gains-network',
    addresses: {
      [ChainId.ARBITRUM]: '0x18c11FD286C5EC11c3b683Caa813B77f5163A122',
    },
  },
  RDNT: {
    coinGeckoId: 'radiant-capital',
    addresses: {
      [ChainId.ARBITRUM]: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
    },
  },
  'DAI+': {
    coinGeckoId: 'dai',
    addresses: {
      [ChainId.ARBITRUM]: '0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8',
    },
  },
  JRT: {
    coinGeckoId: 'jarvis-reward-token',
    addresses: {
      [ChainId.ARBITRUM]: '0x6Aa395F06986ea4eFe0a4630C7865C1eB08D5e7e',
    },
  },
  'USD+': {
    coinGeckoId: 'usd-coin',
    addresses: {
      [ChainId.ARBITRUM]: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
    },
  },
  DEUS: {
    coinGeckoId: 'deus-finance-2',
    addresses: {
      [ChainId.ARBITRUM]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    },
  },
}

export const NO_ARBITRUM_TOKEN_ADDRESS = [TOKEN_INF0.DEUS.addresses[ChainId.ARBITRUM]]

export const getTokenInfos = (chainId: ChainId): { tokenAddress: string; geckoId: string }[] => {
  const infos = Object.entries(TOKEN_INF0)
    .filter((info) => info[1].coinGeckoId && info[1].addresses[chainId])
    .map((info) => {
      return {
        geckoId: info[1].coinGeckoId,
        tokenAddress: info[1].addresses[chainId],
      }
    })

  return infos
}

export function getTokenInfo(key: TokenLookupKey, chainId: number): TokenInfoMapping & { address: string } {
  const token = TOKEN_INF0[key]

  return {
    ...token,
    address: token.addresses[chainId],
  }
}

export const getTokenAddress = (keyOrSymbol: TokenLookupKey, chainId: ChainId = ChainId.ARBITRUM) => {
  const ref = TOKEN_LIST[keyOrSymbol]
  if (!ref) {
    const msg = `No address mapping for keyOrSymbol: ${keyOrSymbol}`
    console.log(msg)
    throw new Error(msg)
  }

  const address = TOKEN_LIST[keyOrSymbol][chainId]
  if (!address) {
    const msg = `No chain id address mapping: ${chainId}`
    console.log(msg)
    throw new Error(msg)
  }

  return address
}

export const getTokenImage = (address: string) => {
  return `/images/tokens/${address}.png`
}

export const TOKEN_LIST: { [key in TokenLookupKey]?: { [chainId: number]: string } } = {
  ProtocolToken: {
    [ChainId.ARBITRUM]: '0xD5954c3084a1cCd70B4dA011E67760B8e78aeE84',
  },
  xProtocolToken: {
    [ChainId.ARBITRUM]: '0xa954A31137fBe5c2D384A0067DE042bAA58b3403',
  },
  WETH: {
    [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
}
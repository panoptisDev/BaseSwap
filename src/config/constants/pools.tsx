import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { serializeTokens } from 'utils/serializeTokens'
import { DEFAULT_CHAIN_ID } from 'utils/providers'
import { TOKENS_CHAIN_MAP, bscTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

// const serializedTokens = serializeTokens(bscTokens)
const serializedTokens = serializeTokens(TOKENS_CHAIN_MAP[DEFAULT_CHAIN_ID])

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto CAKE</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake BSWAP</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Stake BSWAP</Trans>,
    description: <Trans>Flexible staking.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: SerializedPoolConfig[] = [
  // {
  //   sousId: 0,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.cake,
  //   contractAddress: {
  //     97: '',
  //     56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652', // This is their CHEFV2....
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '10',
  //   isFinished: false,
  // },
  {
    sousId: 100,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.bbt,
    contractAddress: {
      [ChainId.BASE_GOERLI]: '0x1e736b5F43eD3D92DE55fA4F276355544Fe21984',
      [ChainId.BASE]: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.0000001',
  },
]

// known finished pools
const finishedPools = [
  // {
  //   sousId: 285,
  //   stakingToken: serializedTokens.cake,
  //   earningToken: serializedTokens.sdao,
  //   contractAddress: {
  //     56: '0x168eF2e470bfeAEB32BE52FB218A41483904851c',
  //     97: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.405',
  //   version: 3,
  // }
].map((p) => ({ ...p, isFinished: true }))

export default [...livePools, ...finishedPools]

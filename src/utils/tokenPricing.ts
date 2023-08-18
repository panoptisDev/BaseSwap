import { ChainId } from '@magikswap/sdk'
import { getCoingeckoTokenInfos, getDexscreenerTokenInfos, getTokenAddress } from 'config/constants/token-info'
import { millisecondsToSeconds } from 'date-fns'

const cacheTimeSeconds = 30
const storageKey = 'TOKEN_PRICES'
const screenerStorageKey = 'DS_TOKEN_PRICES'

const wethCacheKey = 'WETH_PRICE'

export async function getWethPrice() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&vs_currencies=usd`,
    )
    const price = await response.json()

    return price['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2']?.usd
  } catch (error) {
    console.log('Fetching WETH price failed')
    return 0
  }
}

const priceDexScreener = async (address: any): Promise<any> => {
  const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`, {
    method: 'GET',
  });
  const res = await response.json();
  return res.pairs[0].priceUsd;
}

const priceDexScreenerLP = async (address: any): Promise<any> => {
  const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${address}`, {
    method: 'GET',
  });
  return await response.json();
}


export async function getCombinedTokenPrices(chainId: ChainId) {
  try {
    const tokenAddresses = getCoingeckoTokenInfos(chainId).map((ti) => ti.tokenAddress)
    const screenPairAddresses = getDexscreenerTokenInfos(chainId).map((ti) => ti.dexscreenerPair)

    const [geckoPrices, screenerPrices, wethPrice] = await Promise.all([
      fetchMultipleCoinGeckoPricesByAddress(tokenAddresses),
      getDexscreenerPrices(screenPairAddresses),
      getWethPrice(),
    ])

    const prices = {
      ...geckoPrices.prices,
      ...screenerPrices,
    }

    // Fill in for WETH address
    const wethAddress = getTokenAddress('WETH', chainId)
    prices[wethAddress.toLowerCase()] = wethPrice

    return {
      prices,
      getPrice: (token: string) => prices[token.toLowerCase()]?.usd || 0,
    }
  } catch (error) {
    console.log('getCombinedTokenPrices: Error get prices')
    return {
      prices: {},
      getPrice: (token: string) => 0,
    }
  }
}

export const fetchMultipleCoinGeckoPricesByAddress = async (
  tokenAddresses: string[],
  platform: 'arbitrum-one' | 'ethereum' = 'arbitrum-one',
): Promise<{ prices: { [tokenAddress: string]: number }; getPrice: (token: string) => number }> => {
  const cached = localStorage.getItem(storageKey)
  if (cached) {
    const data = JSON.parse(cached)

    const timeElapsed = millisecondsToSeconds(Date.now()) - millisecondsToSeconds(data.lastTime)
    if (timeElapsed < cacheTimeSeconds) {
      // console.log('Returning prices from cache')
      // console.log('timeElapsed: ' + timeElapsed)
      return {
        prices: data.prices,
        getPrice: (token: string) => data.prices[token.toLowerCase()] || 0,
      }
    }
  }

  const priceDexScreener = async (token_id: any): Promise<any> => {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token_id.address}`, {
      method: 'GET',
    });
    const res = await response.json();
    return res.pairs[0].priceUsd;
  }

  const priceDexScreenerLP = async (token_id: any): Promise<any> => {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${token_id.address}`, {
      method: 'GET',
    });
    return await response.json();
  }

  //console.log('Token price cache expired. Making API call...')

  const addresses = tokenAddresses.map((t) => t.toLowerCase()).join(',')

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/base?contract_addresses=${addresses}&vs_currencies=usd`,
    )
    const prices = await response.json()

    // for (const address in prices) {
    //   prices[address.toLowerCase()] = prices[address].usd
    // }

    // localStorage.setItem(
    //   storageKey,
    //   JSON.stringify({
    //     lastTime: Date.now(),
    //     prices,
    //   }),
    // )

    //   console.log('Token prices fetched')

    return {
      prices,
      getPrice: (token: string) => {
        return prices[token.toLowerCase()] || 0
      },
    }
  } catch (error) {
    console.log(`fetchMultipleCoinGeckoPrices: fetch coin gecko prices failed: ${new Date().toUTCString()}`)

    const cached2 = localStorage.getItem(storageKey)
    if (cached2) {
      const data = JSON.parse(cached2)

      const prices = data.prices
      return {
        prices,
        getPrice: (token: string) => prices[token.toLowerCase()] || 0,
      }
    }

    //  console.log('fetchMultipleCoinGeckoPrices: nothing to return from cache')

    return {
      prices: {},
      getPrice: (token: string) => 0,
    }
  }
}

export async function getDexscreenerPrices(pairAddresses: string[], platform: 'base' = 'base') {
  try {
    if (!pairAddresses.length) return {}

    const cached = localStorage.getItem(screenerStorageKey)
    if (cached) {
      const data = JSON.parse(cached)

      const timeElapsed = millisecondsToSeconds(Date.now()) - millisecondsToSeconds(data.lastTime)
      if (timeElapsed < cacheTimeSeconds) {
        // console.log('Returning prices from cache')
        // console.log('timeElapsed: ' + timeElapsed)
        return {
          prices: data.prices,
          getPrice: (token: string) => data.prices[token.toLowerCase()] || 0,
        }
      }
    }

    const response = await fetch(`https://api.dexscreener.io/latest/dex/pairs/base/${pairAddresses.join(',')}`)
    const priceInfo = await response.json()

    const prices: any = {}
    priceInfo.pairs.forEach((pair) => {
      prices[pair.baseToken.address.toLowerCase()] = parseFloat(pair.priceUsd)
    })

    return prices
  } catch (error) {
    console.log('getDexscreenerPrices failed')

    return {}
  }
}

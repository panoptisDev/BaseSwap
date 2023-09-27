import { Flex, Spinner } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getTokenInstance } from 'config/constants/token-info'
import useMerklRewards from 'lib/hooks/merkl-rewards/useMerklRewards'
import Page from 'views/Page'
import PageHeader from 'components/PageHeader'
import { PoolCardActionProps } from 'views/xFarms/components/types'
import TypeIt from 'typeit-react'
import 'animate.css'
import { getTVLFormatted } from 'views/xFarms/utils'
import PoolCard from './components/PoolCard'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'

const WelcomeTypeIt = styled(TypeIt)`
  font-weight: 400;
  color: #fff;
  text-align: center;
  margin-bottom: 12px;
  text-transform: uppercase;
  font-size: 40px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`

export default function PoolV3({ table }: PoolCardActionProps) {
  const { account } = useWeb3React()
  const { data: merklData } = useMerklRewards()
  // console.log(merklData?.pools)

  const pools = (merklData?.pools || []).map((p) => {
    const feeAmount = p.poolFee * 10000
    return {
      ...p,
      feeAmount,
      token: getTokenInstance(p.token0),
      quoteToken: getTokenInstance(p.token1),
      tvl: getTVLFormatted(p.tvl),
    }
  })

  return (
    <Page>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <WelcomeTypeIt
              options={{
                cursorChar: ' ',
                cursorSpeed: 1000000,
                speed: 25,
              }}
              speed={10}
              getBeforeInit={(instance) => {
                instance.type('CONCENTRATED')
                return instance
              }}
            ></WelcomeTypeIt>
            <WelcomeTypeIt
              options={{
                cursorChar: ' ',
                cursorSpeed: 1000000,
                speed: 50,
              }}
              speed={10}
              getBeforeInit={(instance) => {
                instance.type('FARMS')
                return instance
              }}
            ></WelcomeTypeIt>
          </Flex>
        </Flex>
      </PageHeader>
      <Flex>
        {!account ? (
          <ConnectWalletButton style={{ marginTop: '1rem' }}>Connect</ConnectWalletButton>
        ) : pools?.length > 0 ? (
          pools.map((p) => {
            console.log('p', p)

            return <PoolCard key={p.pool} p={p} table={table} />
          })
        ) : (
          <Spinner />
        )}
      </Flex>
    </Page>
  )
}

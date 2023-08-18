import styled from 'styled-components'
import { Flex, Heading, Tag, Skeleton } from '@pancakeswap/uikit'
import { TokenPairImage } from 'components/TokenImage'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@magikswap/sdk'
import { FarmAuctionTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  token: Token
  quoteToken: Token
  quantum?: boolean
  classic?: boolean
  narrow?: boolean
  wide?: boolean
  isNew?: boolean
  stable?: boolean
  isCore?: boolean
  isCommunityFarm?: boolean

}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`


const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  token,
  quoteToken,
  quantum,
  classic,
  narrow,
  wide,
  isNew,
  multiplier, 
  stable,
  isCore,
  isCommunityFarm, 
}) => {
  const { t } = useTranslation()

  let quantumText = ''
  if (quantum && wide) {
    quantumText = 'WIDE'
  } else if (quantum && narrow) {
    quantumText = 'NARROW'
  } else if (quantum && stable) {
    quantumText = 'STABLE'
  } else if (classic && isCore) {
    quantumText = 'BASESWAP'
  }

  // add in stable props

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />

      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <FarmAuctionTag /> : <CoreTag />}
          </Flex>
  {multiplier ? (
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
      </Flex>
    </Wrapper>
  )
}

export default CardHeading

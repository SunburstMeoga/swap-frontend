import { useTranslation } from '@pancakeswap/localization'
import { Button, Card, CardBody, CardFooter, Flex, Image, Text } from '@pancakeswap/uikit'
import NextLink from 'next/link'
import { styled } from 'styled-components'
import { useFourYearTotalVeCakeApr } from 'views/CakeStaking/hooks/useAPR'

const CardWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  margin-top: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 296px;
    margin-left: 110px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`

const ImageWrapper = styled(Image)`
  display: none;
  position: absolute;
  width: 174px;
  height: 196px;
  z-index: 2;
  left: -45%;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`
const StyledCardBody = styled(CardBody)`
  border-bottom: none;
`
const StyledCardFooter = styled(CardFooter)`
  border-top: none;
  position: relative;
  padding: 8px 24px 16px;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% - 48px);
    top: 0px;
    left: 24px;
    background-color: ${({ theme }) => theme.colors.cardBorder};
  }
`

export const VeCakeFourYearCard = () => {
  const { t } = useTranslation()
  const { totalApr } = useFourYearTotalVeCakeApr()

  return (
    <CardWrapper>
      <ImageWrapper
        width={174}
        height={196}
        placeholder="blur"
        alt="boosterCardImage"
        src="/images/pool/pool-vecake-card-icon.png"
      />
      <Card p="0px" style={{ zIndex: 1 }}>
        <StyledCardBody style={{ padding: '8px 24px 2px 24px' }}>
          <Text fontSize={14} bold color="secondary">
            {/* {t('CAKE Staking')} */}
            PGChain 双币质押计划
          </Text>
          <Text fontSize={20} bold color="text">
            {/* {t('Up to %apr%% APR', { apr: totalApr.toFixed(2) })} */}
            年化收益率高达 26.34%
          </Text>
        </StyledCardBody>
        <StyledCardFooter>
          <Text color="textSubtle" fontSize={12}>
            {/* {t('Stake CAKE to get veCAKE, earn up to %apr%% APR from veCAKE pool and revenue sharing.', {
              apr: totalApr.toFixed(2),
            })} */}
            PGChain为庆祝与Hash Ahead的合作，特别为用户申请了一定份额的 HAH，只需在进行双币质押时，支付一定数量的 USD3 即可购买HAH，并与PGC共同进行双币质押，质押完成后即可获得HAH（数量有限，先到先得）
          </Text>
          <Text color="textSubtle" fontSize={12} mt="8px">
            请注意：质押完成后，USD3 将不会退还，您会得到质押时购买的HAH 和质押的 PGC。此外，您还会获得以 PGC 结算的质押奖励。
          </Text>
          <Text color="textSubtle" fontSize={12} mt="8px">
            此外，{t('Unlock other benefits like voting incentives, yield boosting, IFO, and so much more...')}
            {/* 请注意：质押完成后，USD3 将不会退还，您会得到质押时购买的HAH 和质押的 PGC。此外，您还会获得以 PGC 结算的质押奖励。 */}
          </Text>
          <NextLink href="/cake-staking" passHref>
            <Button mt="16px" width="100%" variant="subtle">
              {/* {t('Go to veCAKE staking')} */}
              前往质押
            </Button>
          </NextLink>
        </StyledCardFooter>
      </Card>
    </CardWrapper>
  )
}

import { styled } from 'styled-components'

import { checkIsBoostedPool } from '@pancakeswap/pools'
import { Flex, FlexLayout, Heading, Link, Loading, PageHeader, Text, ViewMode } from '@pancakeswap/uikit'
import { Pool } from '@pancakeswap/widgets-internal'
import { useAccount } from 'wagmi'

import { ChainId } from '@pancakeswap/chains'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Page from 'components/Layout/Page'
import { TokenPairImage } from 'components/TokenImage'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePoolsPageFetch, usePoolsWithVault } from 'state/pools/hooks'

import CakeVaultCard from './components/CakeVaultCard'
import AprRow from './components/PoolCard/AprRow'
import CardActions from './components/PoolCard/CardActions'
import CardFooter from './components/PoolCard/CardFooter'
import PoolControls from './components/PoolControls'
import NameCell from './components/PoolsTable/Cells/NameCell'
import PoolRow from './components/PoolsTable/PoolRow'
import { VeCakeFourYearCard } from './components/VeCakeFourYearCard'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const FinishedTextContainer = styled(Flex)`
  padding-bottom: 32px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const FinishedTextLink = styled(Link)`
  font-weight: 400;
  white-space: nowrap;
  text-decoration: underline;
`

const Pools: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { pools, userDataLoaded } = usePoolsWithVault()

  usePoolsPageFetch()

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {/* {t('PGChain Dual Currency Pledge')} */}
              PGChain双币质押
            </Heading>
            <Heading scale="md" color="text">
              {/* {t('Just stake some tokens to earn.')} */}
              通过质押代币，轻松赚取收益。
            </Heading>
            <Heading scale="md" color="text">
              {/* {t('High APR, low risk.')} */}
              低风险，高年化收益率，您的最佳选择。
            </Heading>
          </Flex>
          <VeCakeFourYearCard />
        </Flex>
      </PageHeader>
      <Page>
        <PoolControls pools={pools}>
          {({ chosenPools, viewMode, stakedOnly, normalizedUrlSearch, showFinishedPools }) => (
            <>
              {showFinishedPools && chainId === ChainId.BSC && (
                <FinishedTextContainer>
                  <Text fontSize={['16px', null, '20px']} color="failure" pr="4px">
                    {t('Looking for v1 CAKE syrup pools?')}
                  </Text>
                  <FinishedTextLink
                    href="https://v1-farms.pancakeswap.finance/pools/history"
                    fontSize={['16px', null, '20px']}
                    color="failure"
                  >
                    {t('Go to migration page')}.
                  </FinishedTextLink>
                </FinishedTextContainer>
              )}
              {account && !userDataLoaded && stakedOnly && (
                <Flex justifyContent="center" mb="4px">
                  <Loading />
                </Flex>
              )}
              {viewMode === ViewMode.CARD ? (
                <CardLayout>
                  {chosenPools.map((pool) =>
                    pool.vaultKey ? (
                      <CakeVaultCard key={pool.vaultKey} pool={pool} showStakedOnly={stakedOnly} />
                    ) : (
                      <Pool.PoolCard<Token>
                        key={pool.sousId}
                        pool={pool}
                        isBoostedPool={Boolean(chainId && checkIsBoostedPool(pool.contractAddress, chainId))}
                        isStaked={Boolean(pool?.userData?.stakedBalance?.gt(0))}
                        cardContent={
                          account ? (
                            <CardActions pool={pool} stakedBalance={pool?.userData?.stakedBalance} />
                          ) : (
                            <>
                              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                                {t('Start earning')}
                              </Text>
                              <ConnectWalletButton />
                            </>
                          )
                        }
                        tokenPairImage={
                          <TokenPairImage
                            primaryToken={pool.earningToken}
                            secondaryToken={pool.stakingToken}
                            width={64}
                            height={64}
                          />
                        }
                        cardFooter={<CardFooter pool={pool} account={account ?? ''} />}
                        aprRow={<AprRow pool={pool} stakedBalance={pool?.userData?.stakedBalance} />}
                      />
                    ),
                  )}
                </CardLayout>
              ) : (
                <Pool.PoolsTable>
                  {chosenPools.map((pool) =>
                    pool.vaultKey ? (
                      <div style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
                        <NameCell pool={pool} />
                        <div style={{ width: '60%', paddingRight: '20px' }}>
                          <div style={{ color: '#DA251D' }}>投票规则</div>
                          <div style={{ color: '#F5B7B1', fontSize: '12px', fontWeight: 200 }}>投票方法:用户可以通过质押PGC为候选人投票。1PGC代表1票，每票只能投票给一名候选人。每次投票数最少100PGC。

                            每轮投票时长:节点排名根据用户投票数更新，每30分钟发放一次奖励。

                            提取规则:用户可以随时赎回PGC并退出节点投票，赎回的PGC将在彻票后锁仓2天，2天后需按提取按钮取回赎回的PGC。而提取收益的PGC可以随时提取并无锁仓期。</div>

                        </div>
                      </div>
                      // <VaultPoolRow
                      //   initialActivity={normalizedUrlSearch.toLowerCase() === pool.earningToken.symbol?.toLowerCase()}
                      //   key={pool.vaultKey}
                      //   vaultKey={pool.vaultKey}
                      //   account={account ?? ''}
                      // />
                    ) : (
                      <PoolRow
                        initialActivity={normalizedUrlSearch.toLowerCase() === pool.earningToken.symbol?.toLowerCase()}
                        key={pool.sousId}
                        sousId={pool.sousId}
                        account={account ?? ''}
                      />
                    ),
                  )}
                </Pool.PoolsTable>
              )}
              {/* <Image
                mx="auto"
                mt="12px"
                src="/images/decorations/3d-syrup-bunnies.png"
                alt="Pancake illustration"
                width={192}
                height={184.5}
              /> */}
            </>
          )}
        </PoolControls>
        {/* <V3SubgraphHealthIndicator /> */}
      </Page>
    </>
  )
}

export default Pools

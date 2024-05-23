import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Ex.Zone',
  defaultTitle: 'Game | Ex.Zone',
  description: 'Play different games on Ex.Zone, using CAKE and Ex.Zone NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@Ex.Zone',
    site: '@Ex.Zone',
  },
  openGraph: {
    title: '🥞 Ex.Zone - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on Ex.Zone, using CAKE and Ex.Zone NFTs',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}

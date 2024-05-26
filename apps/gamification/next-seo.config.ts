import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | PGSWAP FINANCE',
  defaultTitle: 'Game | PGSWAP FINANCE',
  description: 'Play different games on PGSWAP FINANCE, using CAKE and PGSWAP FINANCE NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@PGSWAP FINANCE',
    site: '@PGSWAP FINANCE',
  },
  openGraph: {
    title: '🥞 PGSWAP FINANCE - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on PGSWAP FINANCE, using CAKE and PGSWAP FINANCE NFTs',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}

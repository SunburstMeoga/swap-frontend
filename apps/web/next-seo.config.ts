import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | PGSWAP FINANCE',
  defaultTitle: 'PGSWAP FINANCE',
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@PGSWAP FINANCE',
    site: '@PGSWAP FINANCE',
  },
  openGraph: {
    title: "🥞 PGSWAP FINANCE - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              fontWeight: '400',
              backgroundColor: 'rgb(243 244 246)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '85%'
            },
            'code:not(pre code)': {
              color: '#eb5757'
            },
            pre: {
              backgroundColor: '#1a1b26',
              color: '#fff',
              borderRadius: '0.5rem'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}

export default config
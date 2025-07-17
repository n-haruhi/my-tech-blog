import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ネオン系カラーパレット
        neon: {
          dark: "#0f172a",
          slate: "#1e293b",
          card: "#334155",
          border: "#475569",
          text: "#f1f5f9",
          muted: "#94a3b8",
          cyan: "#06b6d4",
          blue: "#0ea5e9",
          hover: "#0891b2",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              fontWeight: "400",
              backgroundColor: "#334155",
              color: "#06b6d4",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "85%",
            },
            "code:not(pre code)": {
              color: "#06b6d4",
            },
            pre: {
              backgroundColor: "#1e293b",
              color: "#f1f5f9",
              borderRadius: "0.5rem",
              border: "1px solid #475569",
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}

export default config
import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                "my-theme": {
                    primary: "#7e22ce",
                    secondary: "#2563eb",
                    accent: "#f97316",
                    neutral: "#9ca3af",
                },
            },
        ],
    },
}
export default config

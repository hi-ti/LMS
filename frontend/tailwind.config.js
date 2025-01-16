/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				custom: {
					'dark': '#3D4255',
					'red': '#EFF7CF',
					'pink': '#E5446D',
					'light': '#444b62',
					'blue': '#7C9EB2',
				},
			},
		},
	},
	plugins: [nextui()],
};
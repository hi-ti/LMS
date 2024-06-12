/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				custom: {
					'black': '#04151F',
					'pink': '#E9BCB7',
					'purple': '#8A4FFF',
					'green': '#09BC8A',
					'blue': '#A0CCD8',
				},
			},
			backgroundImage: theme => ({
				'gradient-dark-blue-light-pink': `linear-gradient(to right, ${theme('colors.custom.dark-blue')}, ${theme('colors.custom.light-pink')})`,
				'gradient-purple-green': `linear-gradient(to right, ${theme('colors.custom.purple')}, ${theme('colors.custom.green')})`,
				'gradient-light-blue-dark-blue': `linear-gradient(to right, ${theme('colors.custom.light-blue')}, ${theme('colors.custom.dark-blue')})`,
				'gradient-purple-light-blue': `linear-gradient(to right, ${theme('colors.custom.purple')}, ${theme('colors.custom.light-blue')})`,
			}),
		},
	},
	plugins: [nextui()],
};

// module.exports = {
// 	theme: {
// 		extend: {
// 			colors: {
// 				custom: {
// 					'dark-blue': '#04151F',
// 					'light-pink': '#E9BCB7',
// 					'purple': '#8A4FFF',
// 					'green': '#09BC8A',
// 					'light-blue': '#A0CCD8',
// 				},
// 			},
// 			backgroundImage: theme => ({
// 				'gradient-dark-blue-light-pink': `linear-gradient(to right, ${theme('colors.custom.dark-blue')}, ${theme('colors.custom.light-pink')})`,
// 				'gradient-purple-green': `linear-gradient(to right, ${theme('colors.custom.purple')}, ${theme('colors.custom.green')})`,
// 				'gradient-light-blue-dark-blue': `linear-gradient(to right, ${theme('colors.custom.light-blue')}, ${theme('colors.custom.dark-blue')})`,
// 				'gradient-purple-light-blue': `linear-gradient(to right, ${theme('colors.custom.purple')}, ${theme('colors.custom.light-blue')})`,
// 			}),
// 		},
// 	},
// 	plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.{html,css}', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		screens: {
			sm: '100px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		},
		colors: {
			primary: {
				DEFAULT: '#ed566b',
				over: '#e82842',
				press: '#c8152d'
			},
			secondary: {
				DEFAULT: '#bd3b4e',
				over: '#962f3e',
				press: '#6f232e'
			},
			info: {
				DEFAULT: '#10adf4',
				over: '#098cc8',
				press: '#076a97'
			},
			danger: {
				DEFAULT: '#f01c49',
				over: '#cb0d36',
				press: '#9b0a29'
			},
			caution: {
				DEFAULT: '#eadb3a',
				over: '#dac917',
				press: '#ac9f12'
			},
			success: {
				DEFAULT: '#ace44a',
				over: '#97da21',
				press: '#78ae1a'
			},
			gray: {
				DEFAULT: '#a89ea9',
				text: '#534e56',
				border: '#a89ea9',
				link: '#39363b'
			},
			white: {
				DEFAULT: '#ffffff'
			},
			black: {
				DEFAULT: '#000000'
			},
			dark: {
				primary: {
					DEFAULT: '#534e52',
					over: '#393538',
					press: '#1f1d1e'
				},
				secondary: {
					DEFAULT: '#857886',
					over: '#6a606b',
					press: '#4f4850'
				},
				info: {
					DEFAULT: '#545860',
					over: '#3c3f45',
					press: '#24262a'
				},
				danger: {
					DEFAULT: '#bca9a5',
					over: '#a68d88',
					press: '#90716b'
				},
				caution: {
					DEFAULT: '#78715e',
					over: '#5b5648',
					press: '#3f3b32'
				},
				success: {
					DEFAULT: '#181a17'
				},
				white: {
					DEFAULT: '#ffffff'
				},
				black: {
					DEFAULT: '#121212'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

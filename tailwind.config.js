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
				extralight: '#fde4e3',
				light: '#facfcf',
				DEFAULT: '#e57373',
				dark: '#af4448',
				extradark: '#7f1d1f'
			},
			secondary: {
				extralight: '#e0f7fa',
				light: '#b2ebf2',
				DEFAULT: '#4dd0e1',
				dark: '#00838f',
				extradark: '#005662'
			},
			accent: {
				extralight: '#f3e5f5',
				light: '#ce93d8',
				DEFAULT: '#ab47bc',
				dark: '#7b1fa2',
				extradark: '#4a0072'
			},
			neutral: {
				extralight: '#f6f6f6',
				light: '#eeeeee',
				DEFAULT: '#9e9e9e',
				dark: '#616161',
				extradark: '#212121'
			},
			info: {
				extralight: '#e6f3fd',
				light: '#cce5fc',
				DEFAULT: '#64b5f6',
				dark: '#1976d2',
				extradark: '#0d47a1'
			},
			success: {
				extralight: '#ecf6ee',
				light: '#d6ecd9',
				DEFAULT: '#66bb6a',
				dark: '#388e3c',
				extradark: '#1b5e20'
			},
			warning: {
				extralight: '#ffefe3',
				light: '#ffe0b2',
				DEFAULT: '#ffa726',
				dark: '#f57c00',
				extradark: '#e65100'
			},
			danger: {
				extralight: '#ffeaeb',
				light: '#ffced2',
				DEFAULT: '#ef5350',
				dark: '#d32f2f',
				extradark: '#b71c1c'
			},
			disabled: {
				DEFAULT: '#bdbdbd'
			},
			gray: {
				100: '#f5f5f5',
				200: '#eeeeee',
				300: '#e0e0e0',
				400: '#bdbdbd',
				500: '#9e9e9e',
				600: '#757575',
				700: '#616161',
				800: '#424242',
				900: '#212121'
				// DEFAULT: '#a89ea9',
				// text: '#534e56',
				// border: '#a89ea9',
				// link: '#39363b'
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

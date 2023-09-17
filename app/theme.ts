import {
	type ChakraTheme,
	type StyleFunctionProps,
	type ThemeConfig,
	defineStyleConfig,
	extendTheme,
} from '@chakra-ui/react'

const monoThemeConfig: Pick<
	ChakraTheme,
	'styles' | 'semanticTokens' | 'components' | 'colors'
> = {
	styles: {
		global: ({ colorMode }: StyleFunctionProps) => ({
			body: {
				bg: colorMode === 'dark' ? 'black' : 'white',
				opacity: 1,
			},
			text: {
				color: colorMode === 'dark' ? 'white' : 'black',
			},
		}),
	},

	colors: {},

	components: {
		Card: defineStyleConfig({
			baseStyle: ({ colorMode }: StyleFunctionProps) => ({
				container: {
					bg: colorMode === 'dark' ? 'black' : 'white',
					boxShadow: 0,
				},
			}),
			variants: {
				elevated: {
					container: {
						border: 0,
						boxShadow: 0,
					},
				},
				outline: {
					container: {
						borderColor: 'rgba(127,127,127, 0.25)',
					},
				},
			},
			defaultProps: {
				variant: 'outline',
			},
		}),

		Input: defineStyleConfig({
			variants: {
				outline: ({ colorMode }: StyleFunctionProps) => ({
					field: {
						_focusVisible: {
							borderWidth: 2,
							borderColor: colorMode === 'dark' ? 'white' : 'black',
							boxShadow: 0,
						},
					},
				}),
			},
		}),
	},
	semanticTokens: {
		colors: {
			'chakra-body-bg': { default: '#fff', _dark: '#000' },
			'chakra-border-color': '#88888833',
		},
		shadows: {
			outline: { default: '0 0 0 2px #000', _dark: '0 0 0 2px #fff' },
		},
	},
}

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: false,
}

const theme = extendTheme({ config, ...monoThemeConfig })

export default theme

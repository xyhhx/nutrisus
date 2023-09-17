import {
	type ChakraTheme,
	type StyleFunctionProps,
	type ThemeConfig,
	defineStyleConfig,
	extendTheme,
} from '@chakra-ui/react'

const Card = defineStyleConfig({
	baseStyle: {
		container: {
			borderColor: '#88888888',
		},
	},
	variants: {
		outline: {
			boxShadow: 0,
		},
	},
	defaultProps: {
		variant: 'outline',
	},
})

const monoThemeConfig: Pick<
	ChakraTheme,
	'styles' | 'semanticTokens' | 'components' | 'colors'
> = {
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: props.colorMode === 'dark' ? 'black' : 'white',
				opacity: 1,
			},
			text: {
				color: props.colorMode === 'dark' ? 'white' : 'black',
			},
		}),
	},

	colors: {},

	components: {
		Card,
	},
	semanticTokens: {
		colors: {
			'chakra-body-bg': '#000',
			'chakra-border-color': '#88888833',
		},
	},
}

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: false,
}

const theme = extendTheme({ config, ...monoThemeConfig })

export default theme

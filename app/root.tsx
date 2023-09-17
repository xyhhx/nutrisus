import { ChakraProvider, Heading, ColorModeScript, Box } from '@chakra-ui/react'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	V2_MetaFunction,
	useCatch,
} from '@remix-run/react'

import theme from './theme'
import { GenericErrorBoundary } from '~/components'

export const meta: V2_MetaFunction = () => [
	{
		name: 'charset',
		value: 'utf-8',
	},
]

function Document({
	children,
	title = 'App title',
}: {
	children: React.ReactNode
	title?: string
}) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<title>{title}</title>
				<Links />
			</head>
			<body>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	// throw new Error("💣💥 Booooom");

	return (
		<Document>
			<ChakraProvider theme={theme}>
				<Outlet />
			</ChakraProvider>
		</Document>
	)
}

export function ErrorBoundary() {
	return (
		<Document title="Error!">
			<ChakraProvider theme={theme}>
				<GenericErrorBoundary />
			</ChakraProvider>
		</Document>
	)
}

// How ChakraProvider should be used on CatchBoundary
export function CatchBoundary() {
	const caught = useCatch()

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<ChakraProvider theme={theme}>
				<Box>
					<Heading
						as="h1"
						bg="purple.600"
					>
						[CatchBoundary]: {caught.status} {caught.statusText}
					</Heading>
				</Box>
			</ChakraProvider>
		</Document>
	)
}

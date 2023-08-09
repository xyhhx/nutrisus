import { ChakraProvider, Box, Heading } from "@chakra-ui/react"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	V2_MetaFunction,
	useCatch,
} from "@remix-run/react"

export const meta: V2_MetaFunction = () => [
	{
		name: "charset",
		value: "utf-8",
	},
	{
		name: "viewport",
		value: "width=device-width,initial-scale=1",
	},
]

function Document({
	children,
	title = "App title",
}: {
	children: React.ReactNode
	title?: string
}) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<title>{title}</title>
				<Links />
			</head>
			<body>
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
			<ChakraProvider>
				<Outlet />
			</ChakraProvider>
		</Document>
	)
}

// How ChakraProvider should be used on CatchBoundary
export function CatchBoundary() {
	const caught = useCatch()

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<ChakraProvider>
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

// How ChakraProvider should be used on ErrorBoundary
export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document title="Error!">
			<ChakraProvider>
				<Box>
					<Heading
						as="h1"
						bg="blue.500"
					>
						[ErrorBoundary]: There was an error: {error.message}
					</Heading>
				</Box>
			</ChakraProvider>
		</Document>
	)
}

import type { ReactNode } from "react"
import { Box, Center, Container, Flex, HStack, Spacer, Text } from "@chakra-ui/react"

import { ColorModeSwitcher, SearchBar } from "~/components"
import { Link } from "@remix-run/react"

interface LayoutProps {
	children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex
			h="100vh"
			direction="column"
		>
			<Container maxW="container.xl">
				<Flex py={4}>
					<Center>
						<Link to="/">
							<Text fontWeight="900">Noodle App!</Text>
						</Link>
					</Center>
					<Spacer />
					<Box>
						<HStack>
							<SearchBar />
							<ColorModeSwitcher />
						</HStack>
					</Box>
				</Flex>
			</Container>
			<Box
				flex={1}
				overflowY="auto"
			>
				{children}
			</Box>
		</Flex>
	)
}
export default Layout

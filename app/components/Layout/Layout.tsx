import type { ReactNode } from "react"
import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react"

import { ColorModeSwitcher } from "~/components"

interface LayoutProps {
	children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
	<Flex
		h="100vh"
		direction="column"
	>
		<Flex p=".5rem">
			<Center>
				<Text fontWeight="900">Noodle App!</Text>
			</Center>
			<Center flex={1}>top</Center>
			<Box>
				<ColorModeSwitcher />
			</Box>
		</Flex>
		<Divider />
		<Box flex={1}>{children}</Box>
	</Flex>
)

export default Layout

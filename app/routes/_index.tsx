import { Center, Container } from "@chakra-ui/react"
import type { V2_MetaFunction } from "@remix-run/node"

import { Layout, SearchBar } from "~/components"

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Noodle" },
		{ name: "description", content: "Welcome to Noodle!" },
	]
}

const Index = () => (
	<Layout>
		<Center h="100%">
			<Container>
				<SearchBar />
			</Container>
		</Center>
	</Layout>
)

export default Index

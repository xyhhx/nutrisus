import { Center, Container } from '@chakra-ui/react'
import type { V2_MetaFunction } from '@remix-run/node'

import { Layout, SearchBar } from '~/components'
import { extendMeta } from '~/utils'

export const meta: V2_MetaFunction = ({ matches }) =>
	extendMeta(matches, [
		{ title: 'Nutrisus' },
		{ name: 'description', content: 'Nutrisus amogus' },
	])

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

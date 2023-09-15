import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
	Box,
	Center,
	Heading,
	Link as ChakraLink,
	SlideFade,
	Stack,
	Alert,
	AlertTitle,
	AlertDescription,
	Collapse,
	CloseButton,
	useDisclosure,
	Tooltip,
} from '@chakra-ui/react'
import type { V2_MetaFunction } from '@remix-run/node'
import { Link as RemixLink } from '@remix-run/react'
import { ReactNode, useEffect, useState } from 'react'

import { Layout, SearchBar } from '~/components'
import { extendMeta } from '~/utils'

export const meta: V2_MetaFunction = ({ matches }) =>
	extendMeta(matches, [
		{ title: 'Nutrisus' },
		{ name: 'description', content: 'Nutrisus amogus' },
	])

const SuggestedLink = ({ to, children }: SuggestedLinkProps) => (
	<ChakraLink
		as={RemixLink}
		to={to}
		fontWeight="black"
	>
		{children}
	</ChakraLink>
)

const Suggestions = ({ delay = 5 }: SuggestionsProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })

	useEffect(() => {
		const timeout = setTimeout(() => {
			onOpen()
		}, delay * 1000)

		return () => clearTimeout(timeout)
	}, [])
	return (
		<Collapse
			in={isOpen}
			animateOpacity
		>
			<Alert
				status="info"
				bg="transparent"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
			>
				<InfoOutlineIcon
					color="blue.500"
					boxSize={8}
				/>
				<AlertTitle
					fontSize="lg"
					fontWeight="bold"
					mt={6}
					mb={2}
					color="gray.500"
				>
					Not sure where to start? Here are some ideas:
				</AlertTitle>
				<AlertDescription color="gray.500">
					Try searching for stuff like&nbsp;
					<SuggestedLink to="/search/buckwheat">buckwheat</SuggestedLink>
					,&nbsp;
					<SuggestedLink to="/search/brown%20rice">brown rice</SuggestedLink>,
					or&nbsp;
					<SuggestedLink to="/search/cheese">cheese</SuggestedLink>
				</AlertDescription>
				<Tooltip label="Hide this">
					<CloseButton
						alignSelf="flex-start"
						position="absolute"
						right={0}
						top={0}
						onClick={onClose}
						opacity={0.25}
						_hover={{
							opacity: 1,
						}}
					/>
				</Tooltip>
			</Alert>
		</Collapse>
	)
}
const Index = () => (
	<Layout>
		<Center h="100%">
			<Stack
				direction="column"
				spacing={10}
				px={4}
			>
				<Heading textAlign="center">
					Welcome! Search something to begin.
				</Heading>
				<SearchBar />
				<Suggestions />
			</Stack>
		</Center>
	</Layout>
)

export default Index

interface SuggestionsProps {
	/**
	 * The number of seconds to wait before displaying the suggestion
	 */
	delay?: number
}

interface SuggestedLinkProps {
	/**
	 * Where to link to
	 */
	to: string
	children?: ReactNode
}

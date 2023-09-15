import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import {
	Box,
	ButtonGroup,
	Center,
	Container,
	Divider,
	Flex,
	Heading,
	IconButton,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react'
import {
	fetch,
	json,
	redirect,
	type LoaderArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import {
	Link,
	Location,
	useLoaderData,
	useLocation,
	useNavigate,
	useNavigation,
} from '@remix-run/react'
import { useEffect } from 'react'

import { FoodCardList, GenericErrorBoundary, Layout } from '~/components'
import { extendMeta, getEnvOrDie } from '~/utils'

const getSearchResults = async (query: string, page?: number) => {
	const apiKey = getEnvOrDie('FOOD_DATA_CENTRAL_API_KEY')
	const result = await fetch(
		`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				// dataType: ["RC Legacy", "Foundation"],
				pageNumber: page,
			}),
		},
	)
	const response: FoodCentralSearchResult = await result.json()
	return response
}

export const loader = async ({ request, params: { query } }: LoaderArgs) => {
	const page = new URL(request.url).searchParams.get('page')
	if (!page)
		return json({
			requestedPage: 0,
			query,
			currentPage: 0,
			foods: [],
			totalHits: 0,
			totalPages: 0,

			response: null,
		})

	if (!query) return redirect('/')

	const response = await getSearchResults(query, parseInt(page))
	const { currentPage, foods, totalHits, totalPages } = response

	return json({
		requestedPage: page,
		query,
		currentPage,
		foods,
		totalHits,
		totalPages,
		response,
	})
}

export const meta: V2_MetaFunction = ({ matches }) =>
	extendMeta(matches, [
		{ title: 'Search results' },
		{ name: 'description', content: '' },
	])

export const getNextPagePath = (
	{ pathname, search }: Location,
	currentPage: number,
) => `${pathname}${search.replace(/page=\d+/, `page=${currentPage + 1}`)}`

export const getPrevPagePath = (
	{ pathname, search }: Location,
	currentPage: number,
) => {
	const prevPage = currentPage - 1
	if (prevPage > 0)
		return `${pathname}${search.replace(/page=\d+/, `page=${prevPage}`)}`
	else return false
}

const Search = () => {
	const { query, currentPage, foods, totalHits, totalPages } =
		useLoaderData<typeof loader>()
	const navigate = useNavigate()
	const navigation = useNavigation()
	const location = useLocation()

	const prevPage = getPrevPagePath(location, currentPage)
	const nextPage = getNextPagePath(location, currentPage)

	useEffect(() => {
		if (currentPage === 0) navigate(`/search/${query}?page=1`)
	}, [currentPage])

	return (
		<Layout>
			<Container
				maxW="container.xl"
				py={4}
				h="100%"
				display="flex"
				flexDir="column"
			>
				<Flex
					w="100%"
					justifyContent="space-between"
				>
					<Box>
						<Text
							fontSize="sm"
							opacity={0.75}
						>
							Showing results for
						</Text>
						<Heading>{query}</Heading>
					</Box>

					<VStack
						align="stretch"
						spacing={0}
					>
						<Text
							textAlign="right"
							fontSize="sm"
						>
							Found {totalHits} results
						</Text>
					</VStack>
				</Flex>
				<Divider my={4} />
				{navigation.state === 'idle' ? (
					<FoodCardList foods={foods} />
				) : (
					<Center flex={1}>
						<Spinner />
					</Center>
				)}
				<Box pt={4}>
					<ButtonGroup w="100%">
						{prevPage ? (
							<Link to={prevPage}>
								<IconButton
									flex={1}
									variant="ghost"
									aria-label="Previous Page"
									icon={<ArrowLeftIcon />}
								/>
							</Link>
						) : (
							<Link to="#">
								<IconButton
									variant="ghost"
									aria-label="Previous Page"
									icon={<ArrowLeftIcon />}
									disabled
								/>
							</Link>
						)}
						<Center flex={1}>
							<Text
								textAlign="right"
								fontSize="sm"
							>
								Page {currentPage} / {totalPages}
							</Text>
						</Center>
						{currentPage < totalPages ? (
							<Link to={nextPage}>
								<IconButton
									variant="ghost"
									aria-label="Next page"
									icon={<ArrowRightIcon />}
								/>
							</Link>
						) : (
							<Link to="#">
								<IconButton
									flex={1}
									variant="ghost"
									aria-label="Next page"
									icon={<ArrowRightIcon />}
									disabled
								/>
							</Link>
						)}
					</ButtonGroup>
				</Box>
			</Container>
		</Layout>
	)
}

export const ErrorBoundary = GenericErrorBoundary
export default Search

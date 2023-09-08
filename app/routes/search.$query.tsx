import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import {
	Box,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Container,
	Divider,
	Flex,
	Heading,
	IconButton,
	SimpleGrid,
	Spacer,
	Spinner,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react"
import {
	fetch,
	json,
	redirect,
	type LoaderArgs,
	type V2_MetaFunction,
} from "@remix-run/node"
import {
	Link,
	Location,
	useLoaderData,
	useLocation,
	useNavigate,
	useNavigation,
} from "@remix-run/react"
import { useEffect } from "react"

import { GenericErrorBoundary, Layout } from "~/components"
import { getEnvOrDie } from "~/utils"

const getSearchResults = async (query: string, page?: number) => {
	const apiKey = getEnvOrDie("FOOD_DATA_CENTRAL_API_KEY")
	const result = await fetch(
		`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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
	const page = new URL(request.url).searchParams.get("page")
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

	if (!query) return redirect("/")

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

export const meta: V2_MetaFunction = () => {
	return [{ title: "Search results" }, { name: "description", content: "" }]
}

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
							You searched for
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
				{navigation.state === "idle" ? (
					<SimpleGrid
						spacing={4}
						flex={1}
						overflow="auto"
						templateColumns="repeat(auto-fill, minmax(25rem, 1fr))"
					>
						{foods.map(
							({
								fdcId,
								additionalDescriptions,
								brandName,
								brandOwner,
								description,
								dataType,
							}) => (
								<Card
									variant="outline"
									key={fdcId}
									onClick={() => navigate(`/details/${fdcId}`)}
								>
									<CardHeader justifyContent="space-between">
										<Text
											fontWeight={700}
											fontSize="lg"
											noOfLines={2}
										>
											{description}
										</Text>
									</CardHeader>
									<CardBody>
										<Text fontSize="small">{additionalDescriptions}</Text>
										<Text fontSize="small">{brandName}</Text>
										<Text fontSize="small">{brandOwner}</Text>
									</CardBody>
									<Spacer />
									<Divider />
									<CardFooter justify="space-between">
										<Center>
											<Tag fontSize="xs">{dataType.toUpperCase()}</Tag>
										</Center>
									</CardFooter>
								</Card>
							),
						)}
					</SimpleGrid>
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
							<Link to="javascript: void(0);">
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
							<Link to="javascript: void(0);">
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

interface FoodCentralSearchResult {
	totalHits: number
	currentPage: number
	totalPages: number
	pageList: number[]
	foodSearchCriteria: {
		dataType: string[]
		tradeChannel: string[]
		query: string
		generalSearchInput: string
		brandOwner: string
		pageNumber: number
		sortBy: string
		sortOrder: string
		numberOfResultsPerPage: number
		pageSize: number
		requireAllWords: false
		startDate: string
		endDate: string
		tradeChannels: string[]
		foodTypes: string[]
	}
	foods: Food[]
	aggregations: {
		dataType: {
			Branded: number
		}
		nutrients: {}
	}
}

interface Food {
	fdcId: number
	brandOwner: string
	brandName: string
	description: string
	additionalDescriptions?: string
	scientificName: string
	dataType: string
	ndbNumber?: string
	foodCode?: string
	gtinUpc?: string
	publishedDate: string
	allHighlightFields: string
	score: number
}

interface FoodNutrient {
	type: "FoodNutrient"
	id: number
	nutrient: {
		id: number
		number: string
		name: string
		rank: number
		unitName: string
	}
	nutrientAnalysisDetails: [
		{
			subSampleId: number
			amount: number
			nutrientId: number
			nutrientAcquisitionDetails: [{}]
			labMethodDescription: string
			labMethodTechnique: string
			labMethodOriginalDescription: string
			labMethodLink: string
		},
	]
	amount: number
}

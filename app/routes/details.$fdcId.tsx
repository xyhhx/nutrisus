import {
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	HStack,
	Heading,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react'
import { LoaderArgs, V2_MetaFunction, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	FoodMacrosCard,
	FoodMicronutrientProfileCard,
	GenericErrorBoundary,
	Layout,
} from '~/components'
import { AnyFoodItem } from '~/types'
import { extendMeta, getEnvOrDie } from '~/utils'

export const loader = async ({ params: { fdcId } }: LoaderArgs) => {
	if (!fdcId) return redirect('/')
	const response: AnyFoodItem = await getFoodDetails(fdcId)
	return json(response)
}

export const meta: V2_MetaFunction = ({ matches }) =>
	extendMeta(matches, [
		{
			title: `Food details`,
		},
		{
			name: 'description',
			content: '',
		},
	])

const getFoodDetails = async (fdcId: string) => {
	const apiKey = getEnvOrDie('FOOD_DATA_CENTRAL_API_KEY')
	const result = await fetch(
		`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
	const response = await result.json()
	return response
}

const Details = () => {
	const data = useLoaderData<typeof loader>()
	const { description, dataType, foodPortions } = data

	console.log(data)
	console.log(
		'nutrients',
		data.foodNutrients.map(({ nutrient }) => nutrient.name),
	)

	return (
		<Layout>
			<Flex
				direction="column"
				h="100%"
			>
				<Container maxW={{ xl: 'container.xl', lg: 'container.sm' }}>
					<SimpleGrid
						columns={[1, 2]}
						spacing={4}
					>
						<Box flex={1}>
							<Text fontSize="sm">Details for</Text>
							<Heading>{description}</Heading>
						</Box>
						<Flex
							flex={1}
							align="stretch"
						>
							<Box flex={1}>
								<Text>Data source:</Text>
								<Badge>{dataType}</Badge>
							</Box>
							<Box flex={1}>
								<Text>Serving size:</Text>
								{foodPortions && foodPortions.length ? (
									<Text>
										{foodPortions[0].amount} {foodPortions[0].modifier} (
										{foodPortions[0].gramWeight} g)
									</Text>
								) : (
									<Text>100 g</Text>
								)}
							</Box>
						</Flex>
					</SimpleGrid>
					<Divider py={2} />
				</Container>
				<Stack
					direction={['column', null, null, 'row']}
					flex={1}
					p={4}
				>
					<FoodMacrosCard foodDetails={data} />
					<FoodMicronutrientProfileCard foodDetails={data} />
				</Stack>
			</Flex>
		</Layout>
	)
}

export const ErrorBoundary = GenericErrorBoundary

export default Details

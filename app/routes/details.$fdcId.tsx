import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	Divider,
	Flex,
	HStack,
	Heading,
	SimpleGrid,
	Text,
} from "@chakra-ui/react"
import { LoaderArgs, V2_MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Layout } from "~/components"
import { getEnvOrDie } from "~/utils"

export const loader = async ({ request, params: { fdcId } }: LoaderArgs) => {
	const response: FoodDetails = await getFoodDetails(fdcId)
	return json(response)
}

export const meta: V2_MetaFunction = () => {
	return [{ title: `Food details` }, { name: "description", content: "" }]
}

const getFoodDetails = async (fdcId: string) => {
	const apiKey = getEnvOrDie("FOOD_DATA_CENTRAL_API_KEY")
	const result = await fetch(
		`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
	const response = await result.json()
	return response
}

const getNutrientsFromFoodDetails = (foodDetails: FoodDetails) => {
	let slices

	switch (foodDetails.dataType) {
		case "SC Legacy":
			slices = {
				calories: 8,
				protein: 4,
				totalFats: 5,
				carbs: 9,
				vitamins: [11, 21],
				minerals: [22, 39],
			}
			break
		case "Foundation":
			slices = {
				calories: 2,
				protein: 4,
				totalFats: 5,
				carbs: 8,
				minerals: [11, 22],
				vitamins: [23, 39],
			}
			break
	}

	const calories = foodDetails.foodNutrients?.at(slices.calories)
	const protein = foodDetails.foodNutrients?.at(slices.protein)
	const totalFats = foodDetails.foodNutrients?.at(slices.totalFats)
	const carbs = {
		...foodDetails.foodNutrients?.at(slices.carbs),
		...{ nutrient: { name: "Carbs", unitName: "g" } },
	} as FoodNutrient

	const vitamins = foodDetails.foodNutrients?.slice(...slices.vitamins)
	const minerals = foodDetails.foodNutrients?.slice(...slices.minerals)

	return {
		calories,
		protein,
		totalFats,
		carbs,
		vitamins,
		minerals,
	}
}

const NutrientMacroCard = ({ nutrient }: { nutrient: FoodNutrient }) => (
	<Card
		variant="outline"
		minW="20rem"
		maxW="12vw"
	>
		<CardBody>
			<Text
				fontSize="4xl"
				fontWeight="black"
			>
				{nutrient.amount} {nutrient.nutrient.unitName}
			</Text>
			<Text>{nutrient.nutrient.name}</Text>
		</CardBody>
	</Card>
)

const Details = () => {
	const data = useLoaderData<typeof loader>()

	const { description } = data
	const { calories, protein, totalFats, carbs, vitamins, minerals } =
		getNutrientsFromFoodDetails(data)

	console.log({ vitamins, minerals })

	console.log(
		data.foodNutrients?.map(({ nutrient }, i) => [i, nutrient.name]).join("\n"),
	)
	return (
		<Layout>
			<Flex
				direction="column"
				h="100%"
			>
				<Container maxW="container.xl">
					<Text fontSize="sm">Details for</Text>
					<Heading>{description}</Heading>
					<Divider py={2} />
				</Container>
				<HStack
					flex={1}
					p={4}
					overflowX="scroll"
				>
					<Card
						h="100%"
						overflow="auto"
					>
						<CardHeader>
							<Heading as="h3">Summary</Heading>
						</CardHeader>
						<CardBody>
							<SimpleGrid
								columns={2}
								spacing={2}
							>
								{calories && <NutrientMacroCard nutrient={calories} />}
								{protein && <NutrientMacroCard nutrient={protein} />}
								{totalFats && <NutrientMacroCard nutrient={totalFats} />}
								{carbs && <NutrientMacroCard nutrient={carbs} />}
							</SimpleGrid>
							<Center py={10}>
								<Text>todo</Text>
							</Center>
						</CardBody>
					</Card>
					<Card
						h="100%"
						overflow="auto"
					>
						<CardHeader>
							<Heading as="h3">Nutrient Profile</Heading>
						</CardHeader>
						<CardBody>
							<Text
								fontSize="lg"
								py={2}
							>
								Vitamins
							</Text>
							<SimpleGrid columns={2}>
								{vitamins.map((nutrient: FoodNutrient) => (
									<>
										<Text
											fontSize="sm"
											px={4}
										>
											{nutrient.nutrient.name}
										</Text>
										<Text
											fontSize="sm"
											px={4}
										>
											{nutrient.amount} {nutrient.nutrient.unitName}
										</Text>
									</>
								))}
							</SimpleGrid>
							<Text
								fontSize="lg"
								py={2}
							>
								Minerals
							</Text>
							<SimpleGrid columns={2}>
								{minerals.map((nutrient: FoodNutrient) => (
									<>
										<Text
											fontSize="sm"
											px={4}
										>
											{nutrient.nutrient.name}
										</Text>
										<Text
											fontSize="sm"
											px={4}
										>
											{nutrient.amount} {nutrient.nutrient.unitName}
										</Text>
									</>
								))}
							</SimpleGrid>
						</CardBody>
					</Card>
				</HStack>
			</Flex>
		</Layout>
	)
}

export default Details

interface FoodDetails {
	fdcId: number
	dataType: string
	description: string
	discontinuedDate?: string
	foodComponents?: any[]
	foodAttributes?: {
		id: number
		value: number
		name: string
	}[]
	foodPortions?: []
	publicationDate?: string
	foodNutrients?: FoodNutrient[]
	foodClass?: string
	shortDescription?: string
	modifiedDate?: string
	availableDate?: string
	brandOwner?: string
	brandName?: string
	dataSource?: string
	brandedFoodCategory?: string
	gtinUpc?: string
	householdServingFullText?: string
	ingredients?: string
	marketCountry?: string
	servingSize?: number
	servingSizeUnit?: string
	packageWeight?: string
	foodUpdateLog?: FoodUpdateLog[]
	labelNutrients?: {
		fat: {
			value: number
		}
		saturatedFat: {
			value: number
		}
		transFat: {
			value: number
		}
		cholesterol: {
			value: number
		}
		sodium: {
			value: number
		}
		carbohydrates: {
			value: number
		}
		fiber: {
			value: number
		}
		sugars: {
			value: number
		}
		protein: {
			value: number
		}
		vitaminD: {
			value: number
		}
		calcium: {
			value: number
		}
		iron: {
			value: number
		}
		potassium: {
			value: number
		}
		addedSugar: {
			value: number
		}
		calories: {
			value: number
		}
	}
}

interface FoodNutrient {
	type: "FoodNutrient"
	nutrient: {
		id: number
		number: string
		name: string
		rank: number
		unitName: string
	}
	foodNutrientDerivation: {
		id: number
		code: string
		description: string
	}
	id: number
	amount: number
}

interface FoodUpdateLog {
	discontinuedDate: string
	foodAttributes: []
	fdcId: number
	description: string
	publicationDate: string
	dataType: string
	foodClass: string
	shortDescription: string
	modifiedDate: string
	availableDate: string
	brandOwner: string
	brandName: string
	dataSource: string
	brandedFoodCategory: string
	gtinUpc: string
	householdServingFullText: string
	ingredients: string
	marketCountry: string
	servingSize: number
	servingSizeUnit: string
	packageWeight: string
	foodVersions?: {
		discontinuedDate: string
		foodComponents: []
		foodAttributes: []
		foodPortions: []
		modifiedDate: string
		availableDate: string
		brandOwner: string
		dataSource: string
		gpcCategoryGroup: string
		gtinUpc: string
		householdServingFullText: string
		ingredients: string
		marketCountry: string
		servingSize: number
		servingSizeUnit: string
		fdcId: number
		description: string
		publicationDate: string
		dataType: string
		foodClass: string
	}[]
}

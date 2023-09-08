import {
	Badge,
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
	Spacer,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	Text,
} from '@chakra-ui/react'

import { getNutrientsFromFoodDetails } from '~/utils'

const NutrientMacroCard = ({
	nutrient,
	...restProps
}: {
	nutrient: FoodNutrient
	restProps?: any
}) =>
	nutrient.amount && (
		<Card
			variant="outline"
			minW="20rem"
			maxW="12vw"
			{...restProps}
		>
			<CardBody>
				<Stat>
					<StatLabel>{nutrient.nutrient.name}</StatLabel>
					<StatNumber>
						{nutrient.amount.toFixed(2)} {nutrient.nutrient.unitName}
					</StatNumber>
				</Stat>
			</CardBody>
		</Card>
	)

const FoodMacrosCard = ({ foodDetails }: Props) => {
	const { nutrientConversionFactors } = foodDetails

	const { water, calories, protein, totalFats, carbs, fiber, nitrogen, ash } =
		getNutrientsFromFoodDetails(foodDetails)

	const caloriesFromProximates = nutrientConversionFactors
		? nutrientConversionFactors.find(
				({ name }) => name === 'Calories From Proximates',
		  )
		: null

	const proteinCals = (
		protein?.amount * (caloriesFromProximates?.proteinValue || 4)
	).toFixed(0)
	const fatCals = (
		totalFats?.amount * (caloriesFromProximates?.fatValue || 9)
	).toFixed(0)
	const carbCals = (
		carbs?.amount * (caloriesFromProximates?.carbohydrateValue || 4)
	).toFixed(0)
	return (
		<Card
			h="100%"
			overflow="auto"
		>
			<CardHeader>
				<Heading as="h3">Summary</Heading>
			</CardHeader>
			<CardBody>
				<Card
					// variant="outline"
					variant="elevated"
					boxShadow={0}
					mb={2}
				>
					<CardBody>
						<StatGroup alignItems="center">
							<Stat>
								<StatLabel fontSize="xl">Calories</StatLabel>
								<StatNumber fontSize="xxx-large">
									{parseInt(calories?.amount)} {calories?.nutrient.unitName}
								</StatNumber>
							</Stat>
							<Card
								flex={1}
								h="100%"
								variant="elevated"
								boxShadow={0}
							>
								<CardBody>
									<Text>
										{carbCals} calories from carbs (
										{((carbCals / calories.amount) * 100).toFixed(1)}%)
									</Text>
									<Text>
										{fatCals} calories from fat (
										{((fatCals / calories.amount) * 100).toFixed(1)}%)
									</Text>
									<Text>
										{proteinCals} calories from protein (
										{((proteinCals / calories.amount) * 100).toFixed(1)}%)
									</Text>
								</CardBody>
							</Card>
						</StatGroup>
					</CardBody>
				</Card>
				<SimpleGrid
					columns={2}
					spacing={2}
				>
					{protein && <NutrientMacroCard nutrient={protein} />}
					{totalFats && <NutrientMacroCard nutrient={totalFats} />}
					{carbs && <NutrientMacroCard nutrient={carbs} />}
					{fiber && <NutrientMacroCard nutrient={fiber} />}
				</SimpleGrid>
				<Divider my={4} />
				<SimpleGrid
					columns={3}
					spacing={2}
				>
					{water && (
						<NutrientMacroCard
							nutrient={water}
							minW="9vw"
							maxW="12vw"
						/>
					)}
					{nitrogen && (
						<NutrientMacroCard
							nutrient={nitrogen}
							minW="9vw"
							maxW="12vw"
						/>
					)}
					{ash && (
						<NutrientMacroCard
							nutrient={ash}
							minW="9vw"
							maxW="12vw"
						/>
					)}
				</SimpleGrid>
				<Center py={10}>
					<Text>todo</Text>
				</Center>
			</CardBody>
		</Card>
	)
}
interface Props {
	foodDetails: FoodDetails
}

export default FoodMacrosCard
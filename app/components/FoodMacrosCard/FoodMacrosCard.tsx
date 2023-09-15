import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Divider,
	Flex,
	Heading,
	SimpleGrid,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	Text,
} from '@chakra-ui/react'
import { FoodNutrient } from '~/fdc'

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

	console.log({ totalFats })

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
		<Card h="100%">
			<CardHeader>
				<Heading as="h3">Summary</Heading>
			</CardHeader>
			<CardBody>
				<Card
					variant="elevated"
					boxShadow={0}
					mb={2}
				>
					<CardBody>
						<SimpleGrid columns={[1, null, 2]}>
							<StatGroup alignItems="center">
								{calories?.amount && (
									<Stat>
										<StatLabel fontSize="xl">Calories</StatLabel>
										<StatNumber fontSize="xxx-large">
											{calories.amount.toFixed(0)} {calories?.nutrient.unitName}
										</StatNumber>
									</Stat>
								)}
							</StatGroup>
							<Flex
								justifyContent="center"
								direction="column"
							>
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
							</Flex>
						</SimpleGrid>
					</CardBody>
				</Card>
				<SimpleGrid
					columns={[1, null, null, null, 2]}
					spacing={2}
				>
					{protein && <NutrientMacroCard nutrient={protein} />}
					{totalFats && <NutrientMacroCard nutrient={totalFats} />}
					{carbs && <NutrientMacroCard nutrient={carbs} />}
					{fiber && <NutrientMacroCard nutrient={fiber} />}
				</SimpleGrid>
				<Divider my={4} />
				<SimpleGrid
					columns={[2, null, null, null, 3]}
					spacing={2}
				>
					{water && <NutrientMacroCard nutrient={water} />}
					{nitrogen && <NutrientMacroCard nutrient={nitrogen} />}
					{ash && <NutrientMacroCard nutrient={ash} />}
				</SimpleGrid>
			</CardBody>
		</Card>
	)
}
interface Props {
	foodDetails: FoodDetails
}

export default FoodMacrosCard

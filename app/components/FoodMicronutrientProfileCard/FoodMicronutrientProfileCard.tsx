import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	SimpleGrid,
	Text,
} from '@chakra-ui/react'
import { FoodNutrient } from '~/fdc'
import { AnyFoodItem } from '~/types'
import { getNutrientsFromFoodDetails } from '~/utils'

const FoodMicronutrientProfileCard = ({ foodDetails }: Props) => {
	const { vitamins, minerals } = getNutrientsFromFoodDetails(foodDetails)
	return (
		<Card
			h="100%"
			minW="35vw"
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
					{minerals ? 'Vitamins' : 'Vitamins and Minerals'}
				</Text>
				<SimpleGrid columns={2}>
					{vitamins?.map((nutrient: FoodNutrient) => [
						<Text
							fontSize="sm"
							px={4}
							key={`${nutrient.id}`}
						>
							{nutrient.nutrient.name}
						</Text>,
						<Text
							fontSize="sm"
							px={4}
							key={`${nutrient.id}-val`}
						>
							{nutrient.amount} {nutrient.nutrient.unitName}
						</Text>,
					])}
				</SimpleGrid>
				{minerals && (
					<>
						<Text
							fontSize="lg"
							py={2}
						>
							Minerals
						</Text>
						<SimpleGrid columns={2}>
							{minerals?.map((nutrient: FoodNutrient) => [
								<Text
									fontSize="sm"
									px={4}
									key={`${nutrient.id}`}
								>
									{nutrient.nutrient.name}
								</Text>,
								<Text
									fontSize="sm"
									px={4}
									key={`${nutrient.id}-val`}
								>
									{nutrient.amount} {nutrient.nutrient.unitName}
								</Text>,
							])}
						</SimpleGrid>
					</>
				)}
			</CardBody>
		</Card>
	)
}

interface Props {
	foodDetails: AnyFoodItem
}

export default FoodMicronutrientProfileCard

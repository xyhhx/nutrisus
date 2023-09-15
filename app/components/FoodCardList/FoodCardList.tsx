import { SimpleGrid } from '@chakra-ui/react'

import { FoodCard } from '~/components'
import { AnyFoodItem } from '~/types'

const FoodCardList = ({ foods }: Props) => (
	<SimpleGrid
		spacing={4}
		flex={1}
		overflow="auto"
		columns={[1, null, 2, null, 3]}
	>
		{foods.map(food => (
			<FoodCard
				food={food}
				key={food.fdcId}
			/>
		))}
	</SimpleGrid>
)

interface Props {
	foods: AnyFoodItem[]
}

export default FoodCardList

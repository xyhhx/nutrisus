import { SimpleGrid } from '@chakra-ui/react'

import { FoodCard } from '~/components'

const FoodCardList = ({ foods }: Props) => (
	<SimpleGrid
		spacing={4}
		flex={1}
		overflow="auto"
		templateColumns="repeat(auto-fill, minmax(25rem, 1fr))"
	>
		{foods.map(food => (
			<FoodCard food={food} />
		))}
	</SimpleGrid>
)

interface Props {
	foods: Food[]
}

export default FoodCardList

import { Tag } from '@chakra-ui/react'

const getAppropriateTagColor = (foodDataSource: string) => {
	const typeColorMap = {
		Branded: 'blue',
		Foundation: 'green',
		'SR Legacy': 'yellow',
		'Survey (FNDDS)': 'red',
	}

	return !Object.keys(typeColorMap).includes(foodDataSource)
		? 'red'
		: typeColorMap[foodDataSource]
}

const FoodTypeBadge = ({ dataSource }: FoodTypeBadgeProps) => (
	<Tag
		size="md"
		fontSize="xs"
		colorScheme={getAppropriateTagColor(dataSource)}
	>
		{dataSource}
	</Tag>
)

export default FoodTypeBadge

interface FoodTypeBadgeProps {
	dataSource?: string
}

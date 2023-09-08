import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Divider,
	Spacer,
	Tag,
	Text,
} from '@chakra-ui/react'
import { useNavigate } from '@remix-run/react'

const FoodCard = ({
	food: {
		fdcId,
		additionalDescriptions,
		brandName,
		brandOwner,
		description,
		dataType,
	},
}: Props) => {
	const navigate = useNavigate()
	return (
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
	)
}

interface Props {
	food: Food
}

export default FoodCard

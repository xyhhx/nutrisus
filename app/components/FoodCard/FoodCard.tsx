import { WarningTwoIcon } from '@chakra-ui/icons'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	HStack,
	Spacer,
	Tag,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react'
import { useNavigate } from '@remix-run/react'
import { AnyFoodItem } from '~/types'
import { FoodTypeBadge } from '~/components'

const supportedDataTypes = ['Branded', 'SR Legacy', 'Foundation']

const FoodCard = ({
	food: {
		fdcId,
		additionalDescriptions = '',
		brandName = '',
		brandOwner = '',
		description,
		dataType = '',
	},
}: Props) => {
	const navigate = useNavigate()
	const toast = useToast()
	const dataTypeIsSupported = supportedDataTypes.includes(dataType)
	const handleClick = () => {
		if (dataTypeIsSupported) navigate(`/details/${fdcId}`)
		else
			toast({
				description: 'That food type is unsupported',
				status: 'info',
				isClosable: true,
			})
	}
	return (
		<Card
			variant="outline"
			key={fdcId}
			onClick={handleClick}
			_hover={{
				borderColor: 'rgba(127,127,127,0.5)',
			}}
			_focus={{
				borderColor: 'rgba(127,127,127,0.5)',
			}}
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
				<HStack spacing={1}>
					<FoodTypeBadge dataSource={dataType} />
					{!dataTypeIsSupported && (
						<Tooltip label="This food type is currently unsupported">
							<Tag
								fontSize="xs"
								colorScheme="red"
							>
								<WarningTwoIcon />
							</Tag>
						</Tooltip>
					)}
				</HStack>
			</CardFooter>
		</Card>
	)
}

interface Props {
	food: AnyFoodItem
}

export default FoodCard

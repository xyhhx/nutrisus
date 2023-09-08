import { WarningTwoIcon } from '@chakra-ui/icons'
import {
	Button,
	ButtonGroup,
	Center,
	Code,
	Container,
	Divider,
	Flex,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react'
import {
	isRouteErrorResponse,
	useNavigate,
	useRouteError,
} from '@remix-run/react'

import { Layout } from '~/components'

const GenericErrorBoundary = () => {
	const error = useRouteError()
	const navigate = useNavigate()
	const showDetails = isRouteErrorResponse(error) || error instanceof Error

	return (
		<Layout>
			<Flex
				w="100%"
				h="100%"
				direction="column"
				alignItems="center"
				justifyContent="center"
			>
				<Center flex={1}>
					<VStack spacing={6}>
						<WarningTwoIcon
							w={8}
							h={8}
						/>
						<Heading>Oops! That's an error</Heading>
						<Text>
							The app is still very much a work in progress. Lots of stuff still
							doesn't work, sorry!
						</Text>
						<ButtonGroup>
							<Button
								variant="outline"
								onClick={() => navigate(-1)}
							>
								Click here to go back
							</Button>

							<Button
								variant="ghost"
								onClick={() => navigate('.', { replace: true })}
							>
								Refresh
							</Button>
						</ButtonGroup>
					</VStack>
				</Center>
				{showDetails && (
					<Container
						maxW="container.xl"
						py={2}
					>
						<Divider mb={2} />
						<details>
							<summary>Details:</summary>
							{isRouteErrorResponse(error) && (
								<VStack>
									<Text fontWeight="bold">
										{error.status} {error.statusText}
									</Text>
									<pre>{error.data}</pre>
								</VStack>
							)}

							{error instanceof Error && (
								<VStack>
									<Text>Message:</Text>
									<Code>{error.message}</Code>
									<pre>{error.stack}</pre>
								</VStack>
							)}
						</details>
					</Container>
				)}
			</Flex>
		</Layout>
	)
}
export default GenericErrorBoundary

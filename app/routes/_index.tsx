import { Text } from "@chakra-ui/react"
import type { V2_MetaFunction } from "@remix-run/node"

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Noodle" },
		{ name: "description", content: "Welcome to Noodle!" },
	]
}

export default function Index() {
	return (
		<Text>hai</Text>
	)
}

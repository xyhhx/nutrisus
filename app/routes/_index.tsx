import type { V2_MetaFunction } from "@remix-run/node"

import { Layout } from "~/components"

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "Noodle" },
		{ name: "description", content: "Welcome to Noodle!" },
	]
}

export default function Index() {
	return <Layout>hai</Layout>
}

import { describe, it } from "vitest"
import { render } from "@testing-library/react"

import Layout from "./Layout"

describe("Layout", async () => {
	it("exists", async () => {
		render(<Layout />)
	})
})

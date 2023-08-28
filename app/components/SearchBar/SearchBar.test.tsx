import { describe, it } from "vitest"
import { render } from "@testing-library/react"

import SearchBar from "./SearchBar"

describe("SearchBar", async () => {
	it("exists", async () => {
		render(<SearchBar />)
	})
})

import { describe, it } from "vitest";
import { render } from '@testing-library/react'

import FoodMacrosCard from "./FoodMacrosCard";

describe('FoodMacrosCard', async () => {
	it('exists', async () => {
		render(<FoodMacrosCard />)
	})
})
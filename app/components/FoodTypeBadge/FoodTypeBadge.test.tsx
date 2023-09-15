import { describe, it } from "vitest";
import { render } from '@testing-library/react'

import FoodTypeBadge from "./FoodTypeBadge";

describe('FoodTypeBadge', async () => {
	it('exists', async () => {
		render(<FoodTypeBadge />)
	})
})
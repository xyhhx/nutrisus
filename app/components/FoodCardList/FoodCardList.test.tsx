import { describe, it } from "vitest";
import { render } from '@testing-library/react'

import FoodCardList from "./FoodCardList";

describe('FoodCardList', async () => {
	it('exists', async () => {
		render(<FoodCardList />)
	})
})
import { describe, expect, it } from 'vitest'

import getNutrientsFromFoodItem from './getNutrientsFromFoodDetails'

describe('getNutrientsFromFoodDetails', async () => {
	it('is callable', async () => {
		expect(getNutrientsFromFoodItem).toBeCallable()
	})
})

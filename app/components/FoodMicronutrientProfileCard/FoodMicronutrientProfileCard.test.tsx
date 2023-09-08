import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import FoodMicronutrientProfileCard from './FoodMicronutrientProfileCard'

describe('FoodMicronutrientProfile', async () => {
	it('exists', async () => {
		render(<FoodMicronutrientProfileCard />)
	})
})

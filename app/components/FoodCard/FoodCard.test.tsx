import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import FoodCard from './FoodCard'

describe('FoodCard', async () => {
	it('exists', async () => {
		render(<FoodCard />)
	})
})

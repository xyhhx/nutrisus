import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import GenericErrorBoundary from './GenericErrorBoundary'

describe('GenericErrorBoundary', async () => {
	it('exists', async () => {
		render(<GenericErrorBoundary />)
	})
})

import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import ColorModeSwitcher from './ColorModeSwitcher'

describe('ColorModeSwitcher', async () => {
	it('exists', async () => {
		render(<ColorModeSwitcher />)
	})
})

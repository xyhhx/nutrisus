import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Form } from '@remix-run/react'
import { ChangeEventHandler, useState } from 'react'

const SearchBar = () => {
	const [value, setValue] = useState('')
	const buttonWidth = '4.5rem'

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setValue(event.currentTarget.value)
	}

	return (
		<Form action={`/search/${encodeURIComponent(value)}`}>
			<InputGroup>
				<Input
					placeholder="Search for a food"
					type="search"
					pr={buttonWidth}
					value={value}
					onChange={handleChange}
				/>
				<InputRightElement
					width={buttonWidth}
					pr=".25rem"
				>
					<Button size="sm">Search</Button>
				</InputRightElement>
			</InputGroup>
		</Form>
	)
}
export default SearchBar

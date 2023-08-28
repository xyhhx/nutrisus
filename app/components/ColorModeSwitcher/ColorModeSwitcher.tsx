import { IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const ColorModeSwitcher = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const buttonProps =
		colorMode === "light"
			? {
					"aria-label": "Switch to dark theme",
					icon: <MoonIcon />,
			  }
			: {
					"aria-label": "Switch to light theme",
					icon: <SunIcon />,
			  }
	const handleClick = () => {
		toggleColorMode()
	}

	return (
		<IconButton
			{...buttonProps}
			onClick={handleClick}
			variant="outline"
		/>
	)
}

export default ColorModeSwitcher

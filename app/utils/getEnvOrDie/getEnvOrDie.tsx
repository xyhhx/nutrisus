/**
 * Tries to get an environment variable, or throws an error if it isn't found
 * @param envVar The environment variable to get
 * @returns The environment variable's value
 */
const getEnvOrDie = (envVar: string) => {
	const result = process.env[envVar]
	if (!result)
		throw new Error(
			`The environment variable ${envVar} is required, but isn't set`,
		)

	return result
}

export default getEnvOrDie

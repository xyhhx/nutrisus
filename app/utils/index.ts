/* @plop import injection */
import extendMeta from './extendMeta'
import getNutrientsFromFoodItem from './getNutrientsFromFoodDetails'
import getEnvOrDie from './getEnvOrDie'

export {
	/* @plop export injection */
	extendMeta,
	getNutrientsFromFoodItem as getNutrientsFromFoodDetails,
	getEnvOrDie,
}

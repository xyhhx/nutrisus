import {
	BrandedFoodItem,
	FoodNutrient,
	FoundationFoodItem,
	SRLegacyFoodItem,
	SurveyFoodItem,
} from '~/fdc'
import { AnyFoodItem, IDictionary } from '~/types'

const findNutrientByName = (foodNutrients: FoodNutrient[]) => (name: string) =>
	foodNutrients.find(({ nutrient }) => nutrient?.name === name)

const getNutrientsFromBrandedFoodItem = ({
	fdcId,
	foodNutrients,
}: BrandedFoodItem): Nutrients => {
	if (!foodNutrients) throw new Error(`No nutrient data for food ${fdcId}`)

	const vitaminsHeader = 'Vitamins and Other Components'
	const mineralsHeader = 'Minerals'

	const nutrients = foodNutrients.map(({ nutrient }) => nutrient?.name)
	const findNutrientPartial = findNutrientByName(foodNutrients)
	const proximates = {
		calories: 'Energy',
		protein: 'Protein',
		fiber: 'Fiber, total dietary',
		totalFats: 'Total lipid (fat)',
		carbs: 'Carbohydrate, by difference',
	} as IDictionary<string>

	const sugars = [
		'Sugars, total including NLEA',
		'Sugars, added',
		'Sugars, added',
	]

	const fats = [
		'Cholesterol',
		'Fatty acids, total trans',
		'Fatty acids, total saturated',
	]

	const vitamins = foodNutrients.filter(
		({ nutrient }) =>
			nutrient &&
			nutrient.name &&
			!Object.values(proximates).includes(nutrient.name) &&
			!sugars.includes(nutrient.name) &&
			!fats.includes(nutrient.name),
	)

	return {
		...Object.keys(proximates).reduce(
			(accumulator, current) => ({
				...accumulator,
				[current]: findNutrientPartial(proximates[current]),
			}),
			{},
		),

		vitamins,
	}
}

const getNutrientsFromFoundationFoodItem = ({
	fdcId,
	foodNutrients,
}: FoundationFoodItem): Nutrients => {
	if (!foodNutrients) throw new Error(`No nutrient data for food ${fdcId}`)

	const vitaminsHeader = 'Vitamins and Other Components'
	const mineralsHeader = 'Minerals'

	const nutrients = foodNutrients.map(({ nutrient }) => nutrient?.name)

	const findNutrientPartial = findNutrientByName(foodNutrients)

	return {
		calories: findNutrientPartial('Energy (Atwater General Factors)'),
		protein: findNutrientPartial('Protein'),
		totalFats: findNutrientPartial('Total lipid (fat)'),
		carbs: findNutrientPartial('Carbohydrate, by difference'),
		water: findNutrientPartial('Water'),
		fiber: findNutrientPartial('Fiber, total dietary'),
		nitrogen: findNutrientPartial('Nitrogen'),
		ash: findNutrientPartial('Ash'),

		vitamins: nutrients.includes(vitaminsHeader)
			? foodNutrients.slice(nutrients.indexOf(vitaminsHeader) + 1)
			: [],

		minerals: nutrients.includes(mineralsHeader)
			? foodNutrients.slice(
					nutrients.indexOf(mineralsHeader) + 1,
					nutrients.indexOf(vitaminsHeader),
			  )
			: [],
	}
}

const getNutrientsFromSRLegacyFoodItem = ({
	fdcId,
	foodNutrients,
}: SRLegacyFoodItem): Nutrients => {
	if (!foodNutrients) throw new Error(`No nutrient data for food ${fdcId}`)

	const vitaminsHeader = 'Vitamins and Other Components'
	const mineralsHeader = 'Minerals'

	const nutrients = foodNutrients.map(({ nutrient }) => nutrient?.name)
	const findNutrientPartial = findNutrientByName(foodNutrients)

	return {
		calories: findNutrientPartial('Energy'),
		protein: findNutrientPartial('Protein'),
		totalFats: findNutrientPartial('Total lipid (fat)'),
		carbs: findNutrientPartial('Carbohydrate, by difference'),
		water: findNutrientPartial('Water'),
		fiber: findNutrientPartial('Fiber, total dietary'),
		nitrogen: findNutrientPartial('Nitrogen'),
		ash: findNutrientPartial('Ash'),

		vitamins: nutrients.includes(vitaminsHeader)
			? foodNutrients.slice(
					nutrients.indexOf(vitaminsHeader) + 1,
					nutrients.indexOf('Lipids'),
			  )
			: [],

		minerals: nutrients.includes(mineralsHeader)
			? foodNutrients.slice(
					nutrients.indexOf(mineralsHeader) + 1,
					nutrients.indexOf(vitaminsHeader),
			  )
			: [],
	}
}

const getNutrientsFromFoodItem = (foodItem: AnyFoodItem): Nutrients => {
	if ((foodItem as SurveyFoodItem).datatype)
		throw new Error(`Survey Food Items not supported`)

	switch ((foodItem as Exclude<AnyFoodItem, SurveyFoodItem>).dataType) {
		case 'Branded':
			return getNutrientsFromBrandedFoodItem(foodItem as BrandedFoodItem)
		case 'Foundation':
			return getNutrientsFromFoundationFoodItem(foodItem as FoundationFoodItem)
		case 'SR Legacy':
			return getNutrientsFromSRLegacyFoodItem(foodItem as SRLegacyFoodItem)
		default:
			throw new Error(`Unknown dataType ${foodItem.dataType}`)
	}
}

interface Nutrients {
	calories: FoodNutrient
	protein: FoodNutrient
	totalFats: FoodNutrient
	carbs: FoodNutrient
	water?: FoodNutrient
	fiber?: FoodNutrient
	nitrogen?: FoodNutrient
	ash?: FoodNutrient
	vitamins: FoodNutrient[]
	minerals?: FoodNutrient[]
}

export default getNutrientsFromFoodItem

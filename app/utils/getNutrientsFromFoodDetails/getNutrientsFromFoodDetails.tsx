/**
 *
 */

const getNutrientsFromFoodDetails = (foodDetails: FoodDetails) => {
	let slices

	switch (foodDetails.dataType) {
		case 'SR Legacy':
			slices = {
				calories: 2,
				protein: 4,
				totalFats: 5,
				carbs: 8,
				fiber: 10,

				nitrogen: null,
				ash: 6,

				water: 1,

				vitamins: [11, 21],
				minerals: [22, 39],
			}
			break
		case 'Foundation':
			const mineralsIndex = foodDetails.foodNutrients
				?.map(({ nutrient }) => nutrient.name)
				.indexOf('Minerals')
			const vitaminsIndex = foodDetails.foodNutrients
				?.map(({ nutrient }) => nutrient.name)
				.indexOf('Vitamins and Other Components')

			slices = {
				calories: 3,
				protein: 5,
				totalFats: 6,
				carbs: 9,
				nitrogen: 4,
				ash: 7,
				fiber: 10,
				water: 1,
				minerals: mineralsIndex ? [mineralsIndex + 1, vitaminsIndex] : [],
				vitamins: vitaminsIndex
					? [vitaminsIndex + 1, foodDetails.foodNutrients?.length]
					: [],
			}
			break
	}

	if (!slices) throw new Error(`Unknown dataType ${foodDetails.dataType}`)

	const calories = foodDetails.foodNutrients?.at(slices.calories)
	const protein = foodDetails.foodNutrients?.at(slices.protein)
	const totalFats = foodDetails.foodNutrients?.at(slices.totalFats)
	const carbs = foodDetails.foodNutrients?.at(slices.carbs)
	const ash = foodDetails.foodNutrients?.at(slices.ash)
	const fiber = foodDetails.foodNutrients?.at(slices.fiber)
	const water = foodDetails.foodNutrients?.at(slices.water)
	const nitrogen = slices.nitrogen
		? foodDetails.foodNutrients?.at(slices.nitrogen)
		: null

	const vitamins = foodDetails.foodNutrients?.slice(...slices.vitamins)
	const minerals = foodDetails.foodNutrients?.slice(...slices.minerals)

	return {
		calories,
		protein,
		totalFats,
		carbs,
		water,
		fiber,
		nitrogen,
		ash,
		vitamins,
		minerals,
	}
}
export default getNutrientsFromFoodDetails

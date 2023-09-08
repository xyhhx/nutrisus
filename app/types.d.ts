interface FoodCentralSearchResult {
	totalHits: number
	currentPage: number
	totalPages: number
	pageList: number[]
	foodSearchCriteria: {
		dataType: string[]
		tradeChannel: string[]
		query: string
		generalSearchInput: string
		brandOwner: string
		pageNumber: number
		sortBy: string
		sortOrder: string
		numberOfResultsPerPage: number
		pageSize: number
		requireAllWords: false
		startDate: string
		endDate: string
		tradeChannels: string[]
		foodTypes: string[]
	}
	foods: Food[]
	aggregations: {
		dataType: {
			Branded: number
		}
		nutrients: {}
	}
}

interface Food {
	fdcId: number
	brandOwner: string
	brandName: string
	description: string
	additionalDescriptions?: string
	scientificName: string
	dataType: string
	ndbNumber?: string
	foodCode?: string
	gtinUpc?: string
	publishedDate: string
	allHighlightFields: string
	score: number
}

interface FoodNutrient {
	type: 'FoodNutrient'
	id: number
	nutrient: {
		id: number
		number: string
		name: string
		rank: number
		unitName: string
	}
	nutrientAnalysisDetails: [
		{
			subSampleId: number
			amount: number
			nutrientId: number
			nutrientAcquisitionDetails: [{}]
			labMethodDescription: string
			labMethodTechnique: string
			labMethodOriginalDescription: string
			labMethodLink: string
		},
	]
	amount: number
}


interface FoodDetails {
	fdcId: number
	dataType: string
	description: string
	discontinuedDate?: string
	foodComponents?: any[]
	foodAttributes?: {
		id: number
		value: number
		name: string
	}[]
	foodPortions?: FoodPortion[]
	publicationDate?: string
	foodNutrients?: FoodNutrient[]
	foodClass?: string
	shortDescription?: string
	modifiedDate?: string
	availableDate?: string
	brandOwner?: string
	brandName?: string
	dataSource?: string
	brandedFoodCategory?: string
	gtinUpc?: string
	householdServingFullText?: string
	ingredients?: string
	marketCountry?: string
	servingSize?: number
	servingSizeUnit?: string
	packageWeight?: string
	foodUpdateLog?: FoodUpdateLog[]
	nutrientConversionFactors?: NutrientConversionFactor[]
	labelNutrients?: {
		fat: {
			value: number
		}
		saturatedFat: {
			value: number
		}
		transFat: {
			value: number
		}
		cholesterol: {
			value: number
		}
		sodium: {
			value: number
		}
		carbohydrates: {
			value: number
		}
		fiber: {
			value: number
		}
		sugars: {
			value: number
		}
		protein: {
			value: number
		}
		vitaminD: {
			value: number
		}
		calcium: {
			value: number
		}
		iron: {
			value: number
		}
		potassium: {
			value: number
		}
		addedSugar: {
			value: number
		}
		calories: {
			value: number
		}
	}
}

interface FoodNutrient {
	type: 'FoodNutrient'
	nutrient: {
		id: number
		number: string
		name: string
		rank: number
		unitName: string
	}
	foodNutrientDerivation: {
		id: number
		code: string
		description: string
	}
	id: number
	amount: number
}

interface FoodUpdateLog {
	discontinuedDate: string
	foodAttributes: []
	fdcId: number
	description: string
	publicationDate: string
	dataType: string
	foodClass: string
	shortDescription: string
	modifiedDate: string
	availableDate: string
	brandOwner: string
	brandName: string
	dataSource: string
	brandedFoodCategory: string
	gtinUpc: string
	householdServingFullText: string
	ingredients: string
	marketCountry: string
	servingSize: number
	servingSizeUnit: string
	packageWeight: string
	foodVersions?: {
		discontinuedDate: string
		foodComponents: []
		foodAttributes: []
		foodPortions: []
		modifiedDate: string
		availableDate: string
		brandOwner: string
		dataSource: string
		gpcCategoryGroup: string
		gtinUpc: string
		householdServingFullText: string
		ingredients: string
		marketCountry: string
		servingSize: number
		servingSizeUnit: string
		fdcId: number
		description: string
		publicationDate: string
		dataType: string
		foodClass: string
	}[]
}
interface FoodPortion {
	id: number
	gramWeight: number
	sequenceNumber: number
	amount: number
	modifier: string
	measureUnit: {
		id: number
		name: string
		abbreviation: string
	}
}

interface NutrientConversionFactor {
	id: number
	proteinValue: number
	fatValue: number
	carbohydrateValue: number
	type: string
	name: string
}

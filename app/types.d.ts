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

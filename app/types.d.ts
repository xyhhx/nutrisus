import { AbridgedFoodItem, BrandedFoodItem, FoundationFoodItem, SRLegacyFoodItem, SurveyFoodItem } from "./fdc";

export type AnyFoodItem = AbridgedFoodItem | BrandedFoodItem | FoundationFoodItem | SRLegacyFoodItem | SurveyFoodItem

export interface IDictionary<T> {
	[index: string]: T
}

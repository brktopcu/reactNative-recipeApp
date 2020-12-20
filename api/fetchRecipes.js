import { apiKey, rootApiUrl } from "./apiUtils";

export const fetchRandomRecipes = async () => {
  const response = await fetch(
    rootApiUrl + "/recipes/random" + "?apiKey=" + apiKey + "&number=10"
  );
  const recipes = await response.json();
  return recipes;
};

export const searchRecipes = async (query) => {
  const response = await fetch(
    rootApiUrl + "/recipes/complexSearch" + "?apiKey=" + apiKey + "&query=" + query + "&addRecipeInformation=true" + "&number=10"
  );
  const results = await response.json();
  return results;
};
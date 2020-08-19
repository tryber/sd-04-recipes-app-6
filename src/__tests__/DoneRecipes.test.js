import React from 'react';
import cleanup, { waitFor, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Helper/renderWithRouter';
import renderWithRedux from '../Helper/renderWithRedux';
import App from '../App';
import { setLocalStorage } from '../services/localStorage';
// import favoriteRecipes from '../__mocks__/favoriteRecipesMock';
// import detailsFoodFavorite52785Mock from '../__mocks__/detailsFoodFavorite52785Mock';
import getRecipesApi from '../services/getRecipesApi';
import drinkRecommendationsMock from '../__mocks__/drinkRecommendationsMock';

jest.mock('../services/getRecipesApi');

afterEach(() => {
  cleanup;
  getRecipesApi.mockClear();
});


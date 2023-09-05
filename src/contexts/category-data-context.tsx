import * as React from 'react';
import type { CategoryType } from '../types';

export type CategoryDataContextType = {
	categoryData: {
		[id: string]: CategoryType[];
	};
	setCategoryData: React.Dispatch<
		React.SetStateAction<CategoryDataContextType['categoryData']>
	>;

	yourPicks: {
		[id: string]: { name: string; selected: boolean };
	};
	setYourPicks: React.Dispatch<
		React.SetStateAction<CategoryDataContextType['yourPicks']>
	>;
	toggleAllSelections: (selected: boolean) => void;
};

export const CategoryDataContext = React.createContext<CategoryDataContextType>(
	{
		categoryData: {},
		setCategoryData: () => {},
		yourPicks: {},
		setYourPicks: () => {},
		toggleAllSelections: () => {},
	}
);

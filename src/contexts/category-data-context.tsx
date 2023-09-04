import * as React from 'react';
import type { CategoryType } from '../types';

export type CategoryDataContextType = {
	categoryData: {
		[prop: string]: CategoryType[];
	};
	setCategoryData: React.Dispatch<
		React.SetStateAction<CategoryDataContextType['categoryData']>
	>;

	yourPicks: {
		[id: string]: string;
	};
	setYourPicks: React.Dispatch<
		React.SetStateAction<CategoryDataContextType['yourPicks']>
	>;
};

export const CategoryDataContext = React.createContext<CategoryDataContextType>(
	{
		categoryData: {},
		setCategoryData: () => {},
		yourPicks: {},
		setYourPicks: () => {},
	}
);

import * as React from 'react';
import type { CategoryType } from '../types';

export type CategoryDataContextType = {
	categoryData: {
		[id: string]: CategoryType[];
	};
	setCategoryData: React.Dispatch<
		React.SetStateAction<CategoryDataContextType['categoryData']>
	>;

	chosenCategories: {
		[id: string]: { name: string; selected: boolean };
	};
	toggleAllSelections: (selected: boolean) => void;
	toggleSelection: (props: {
		key: string;
		name: string;
		selected: boolean;
	}) => void;
};

export const CategoryDataContext = React.createContext<CategoryDataContextType>(
	{
		categoryData: {},
		setCategoryData: () => {},
		chosenCategories: {},
		toggleAllSelections: () => {},
		toggleSelection: () => {},
	}
);

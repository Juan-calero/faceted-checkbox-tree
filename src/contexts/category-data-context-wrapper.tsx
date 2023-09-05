import React from 'react';

import {
	CategoryDataContext,
	CategoryDataContextType,
} from './category-data-context';
import categoryResponse from '../api/response.json';

export type CategoryDataContextWrapperType = {
	children: React.ReactNode;
};

export const CategoryDataContextWrapper: React.FC<
	CategoryDataContextWrapperType
> = ({ children }) => {
	const [categoryData, setCategoryData] = React.useState<
		CategoryDataContextType['categoryData']
	>({});
	const [yourPicks, setYourPicks] = React.useState<
		CategoryDataContextType['yourPicks']
	>({});

	React.useEffect(() => {
		let normalizedCategoryData = {};
		let normalizedChosenCategories = {};
		categoryResponse.data.categories.forEach(({ parent, id, name }) => {
			normalizedCategoryData[parent] = [
				...(normalizedCategoryData[parent] || []),
				{ categoryId: id, name },
			];
			normalizedChosenCategories[id] = { name, selected: false };
		});

		setCategoryData(normalizedCategoryData);
		setYourPicks(normalizedChosenCategories);
	}, []);

	const toggleAllSelections = (selected) => {
		setYourPicks(
			Object.keys(yourPicks).reduce(
				(accumulator, key) => ({
					...accumulator,
					[key]: { ...yourPicks[key], selected },
				}),
				{}
			)
		);
	};

	return (
		<CategoryDataContext.Provider
			value={{
				categoryData,
				setCategoryData,
				yourPicks,
				setYourPicks,
				toggleAllSelections,
			}}
		>
			{children}
		</CategoryDataContext.Provider>
	);
};

import React from 'react';

import { CategoryDataContext } from './category-data-context';
import type { CategoryDataContextType } from './category-data-context';
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
	const [chosenCategories, setChosenCategories] = React.useState<
		CategoryDataContextType['chosenCategories']
	>({});

	React.useEffect(() => {
		let normalizedCategoryData: CategoryDataContextType['categoryData'] = {};
		let normalizedChosenCategories: CategoryDataContextType['chosenCategories'] =
			{};

		categoryResponse.data.categories.forEach(({ parent, id, name }) => {
			normalizedCategoryData[parent] = [
				...(normalizedCategoryData[parent] || []),
				{ categoryId: id, name },
			];
			normalizedChosenCategories[id] = { name, selected: false };
		});

		setCategoryData(normalizedCategoryData);
		setChosenCategories(normalizedChosenCategories);
	}, []);

	const toggleAllSelections = (selected: boolean) =>
		setChosenCategories(
			Object.keys(chosenCategories).reduce(
				(accumulator, key) => ({
					...accumulator,
					[key]: { ...chosenCategories[key], selected },
				}),
				{}
			)
		);

	const toggleSelection = (key: string, name: string, selected: boolean) => {
		const toggledCategories: CategoryDataContextType['chosenCategories'] = {};

		const recursiveToggle = (id: string, name: string, selected: boolean) => {
			toggledCategories[id] = { name, selected };
			categoryData[id]?.forEach(({ categoryId, name }) =>
				recursiveToggle(categoryId, name, selected)
			);
		};
		recursiveToggle(key, name, selected);

		setChosenCategories((prevProps) => ({
			...prevProps,
			...toggledCategories,
		}));
	};

	return (
		<CategoryDataContext.Provider
			value={{
				categoryData,
				setCategoryData,
				chosenCategories,
				toggleAllSelections,
				toggleSelection,
			}}
		>
			{children}
		</CategoryDataContext.Provider>
	);
};

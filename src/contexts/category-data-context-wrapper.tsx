import React from 'react';

import { CategoryDataContext } from './category-data-context';
import type { CategoryDataContextType } from './category-data-context';

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
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_ENDPOINT}/categories`
			);
			const categoryData: CategoryDataContextType['categoryData'] =
				await response.json();

			setCategoryData(categoryData);

			const responseChosen = await fetch(
				`${process.env.REACT_APP_SERVER_ENDPOINT}/chosen-categories`
			);
			const chosenCategory: CategoryDataContextType['chosenCategories'] =
				await responseChosen.json();

			setChosenCategories(chosenCategory);
		};
		void fetchData();
	}, []);

	const toggleAllSelections = (selected: boolean) => {
		const toggledCategories = Object.keys(chosenCategories).reduce(
			(accumulator, key) => ({
				...accumulator,
				[key]: { ...chosenCategories[key], selected },
			}),
			{}
		);

		void fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/chosen-categories`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(toggledCategories),
		});
		setChosenCategories(toggledCategories);
	};

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

		void fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/chosen-categories`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(toggledCategories),
		});
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

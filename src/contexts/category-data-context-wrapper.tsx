import React from 'react';

import {
	CategoryDataContext,
	CategoryDataContextType,
} from './category-data-context';
import categoryResponse from '../api/response.json';

export type CategoryDataContextWrapperType = {
	children?: React.ReactNode;
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
		let filteredData = {};
		let filteredData2 = {};
		categoryResponse.data.categories.forEach(({ parent, id, name }) => {
			filteredData[parent] = [...(filteredData[parent] || []), { id, name }];
			filteredData2[id] = { name, selected: false };
		});

		setCategoryData(filteredData);
		setYourPicks(filteredData2);
	}, []);

	return (
		<CategoryDataContext.Provider
			value={{ categoryData, setCategoryData, yourPicks, setYourPicks }}
		>
			{children}
		</CategoryDataContext.Provider>
	);
};
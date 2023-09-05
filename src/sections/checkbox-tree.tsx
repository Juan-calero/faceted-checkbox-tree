import React from 'react';
import { Styled } from './checkbox-tree.styles';
import { CategoryGroup } from './category-group';
import { CategoryDataContext } from '../contexts/category-data-context';

export const CheckboxTree: React.FC = () => {
	const { categoryData } = React.useContext(CategoryDataContext);

	return (
		<Styled.CheckboxTreeWrapper>
			{categoryData['0']?.map(({ categoryId, name }) => (
				<CategoryGroup
					{...{ categoryId, depth: 0, name }}
					key={categoryId}
					parent
					show
				/>
			))}
		</Styled.CheckboxTreeWrapper>
	);
};

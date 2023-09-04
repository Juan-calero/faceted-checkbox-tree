import React from 'react';
import { Styled } from './faceted-checkbox-tree.styles';
import { CategoryGroup } from './category-group';
import { CategoryDataContext } from '../contexts/category-data-context';

export const FacetedCheckboxTree = () => {
	const { categoryData } = React.useContext(CategoryDataContext);

	return (
		<Styled.CheckboxTree>
			{categoryData['0']?.map(({ id, name }) => (
				<CategoryGroup
					show={true}
					key={id}
					checked={false}
					{...{ categoryId: id, depth: 0, name }}
					parent
				/>
			))}
		</Styled.CheckboxTree>
	);
};

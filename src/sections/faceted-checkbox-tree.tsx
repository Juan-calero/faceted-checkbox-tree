import React from 'react';
import { Styled } from './faceted-checkbox-tree.styles';
import { CategoryGroup } from './category-group';

export const FacetedCheckboxTree = () => (
	<Styled.CheckboxTree>
		<CategoryGroup {...{ categoryId: '0', depth: 0 }} parent />
	</Styled.CheckboxTree>
);

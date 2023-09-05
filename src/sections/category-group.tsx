import React from 'react';
import { Checkbox } from '../design-system';
import { CategoryDataContext } from '../contexts/category-data-context';
import { Styled } from './category-group.styles';

export type CategoryGroupType = {
	show: boolean;
	checked?: boolean;
	categoryId: string;
	depth: number;
	parent?: boolean;
	name: string;
};

export const CategoryGroup: React.FC<CategoryGroupType> = ({
	show,
	checked: parentChecked = false,
	categoryId,
	depth,
	parent = false,
	name,
}) => {
	const { categoryData, toggleSelection, chosenCategories } =
		React.useContext(CategoryDataContext);

	const [expandCategoryGroup, setExpandCategoryGroup] = React.useState(false);
	const [checked, setChecked] = React.useState(false);

	React.useEffect(() => {
		toggleSelection(categoryId, name, parentChecked);
	}, [parentChecked]);

	React.useEffect(() => {
		setChecked(chosenCategories[categoryId].selected);
	}, [chosenCategories[categoryId].selected]);

	return (
		<Styled.CategoryGroupWrapper
			$show={show}
			data-testid={`category-group${show ? '-show' : ''}`}
		>
			<Checkbox
				variant={parent ? 'parent' : 'child'}
				{...{ depth, checked }}
				onChange={() => {
					toggleSelection(categoryId, name, !checked);
					setChecked(!checked);
				}}
				onClick={() => setExpandCategoryGroup(!expandCategoryGroup)}
				hasChild={!!categoryData[categoryId]?.length}
				expanded={expandCategoryGroup}
			>
				{name}
			</Checkbox>
			{categoryData[categoryId]?.map(({ categoryId, name }) => (
				<CategoryGroup
					key={categoryId}
					{...{
						show: expandCategoryGroup,
						checked,
						categoryId,
						depth: depth + 1,
						name,
					}}
				/>
			))}
		</Styled.CategoryGroupWrapper>
	);
};

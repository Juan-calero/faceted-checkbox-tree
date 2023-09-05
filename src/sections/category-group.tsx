import React from 'react';
import { Checkbox } from '../design-system';
import { CategoryDataContext } from '../contexts/category-data-context';

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
	const { categoryData, setYourPicks, yourPicks } =
		React.useContext(CategoryDataContext);

	const [expandCategoryGroup, setExpandCategoryGroup] = React.useState(false);
	const [checked, setChecked] = React.useState(false);

	const toggleChosenCategory = (selected) =>
		setYourPicks((prevProps) => ({
			...prevProps,
			[categoryId]: { name, selected },
		}));

	React.useEffect(() => {
		toggleChosenCategory(parentChecked);
	}, [parentChecked]);

	React.useEffect(() => {
		setChecked(yourPicks[categoryId].selected);
	}, [yourPicks[categoryId].selected]);

	return (
		<div style={{ display: show ? 'initial' : 'none' }}>
			<Checkbox
				variant={parent ? 'parent' : 'child'}
				{...{ depth, checked }}
				onChange={() => {
					toggleChosenCategory(!checked);
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
					{...{
						show: expandCategoryGroup,
						checked,
						categoryId,
						depth: depth + 1,
						name,
					}}
				/>
			))}
		</div>
	);
};

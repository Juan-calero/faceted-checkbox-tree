import React from 'react';
import { Checkbox } from '../design-system';
import { CategoryDataContext } from '../contexts/category-data-context';

export const CategoryGroup = ({
	show,
	checked: parentChecked,
	categoryId,
	depth,
	parent = false,
	name,
}) => {
	const { categoryData, setYourPicks, yourPicks } =
		React.useContext(CategoryDataContext);

	const [openGroupIds, setOpenGroupIds] = React.useState(false);
	const [checked, setChecked] = React.useState(false);

	React.useEffect(() => {
		setYourPicks((prevProps) => ({
			...prevProps,
			[categoryId]: { name, selected: parentChecked },
		}));
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
					setYourPicks((prevProps) => ({
						...prevProps,
						[categoryId]: { name, selected: !checked },
					}));
					setChecked(!checked);
				}}
				onClick={() => setOpenGroupIds(!openGroupIds)}
				hasChild={!!categoryData[categoryId]?.length}
				expanded={openGroupIds}
			>
				{name}
			</Checkbox>
			{categoryData[categoryId]?.map(({ id, name }) => (
				<CategoryGroup
					{...{
						show: openGroupIds,
						checked,
						categoryId: id,
						depth: depth + 1,
						name,
					}}
				/>
			))}
		</div>
	);
};

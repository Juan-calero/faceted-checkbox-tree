import React from 'react';
import { Checkbox } from '../design-system';
import { CategoryDataContext } from '../contexts/category-data-context';

export const CategoryGroup = ({ categoryId, depth, parent = false }) => {
	const { categoryData, setCategoryData, setYourPicks } =
		React.useContext(CategoryDataContext);

	const [openGroupIds, setOpenGroupIds] = React.useState({});

	return (
		<>
			{categoryData[categoryId]?.map(({ id, name, checked }) => (
				<div key={id}>
					<Checkbox
						variant={parent ? 'parent' : 'child'}
						{...{ depth, checked }}
						onChange={() => {
							setCategoryData({
								...categoryData,
								[categoryId]: categoryData[categoryId].map((category) => ({
									...category,
									...(category.id === id && { checked: !category.checked }),
								})),
							});

							setYourPicks((prevProps) => ({
								...prevProps,
								[id]: !checked ? name : null,
							}));
						}}
						onClick={() =>
							setOpenGroupIds({ ...openGroupIds, [id]: !openGroupIds[id] })
						}
						hasChild={!!categoryData[id]?.length}
					>
						{name}
					</Checkbox>
					{openGroupIds[id] && (
						<CategoryGroup {...{ categoryId: id, depth: depth + 1 }} />
					)}
				</div>
			))}
		</>
	);
};

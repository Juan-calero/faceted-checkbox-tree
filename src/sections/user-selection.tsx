import React from 'react';
import { Button } from '../design-system/button/button';
import { CategoryDataContext } from '../contexts/category-data-context';

export const UserSelection = () => {
	const { categoryData, setCategoryData, yourPicks } =
		React.useContext(CategoryDataContext);
	const [isAllChecked, setIsAllChecked] = React.useState(false);

	return (
		<div>
			<Button
				onClick={() => {
					setCategoryData(
						Object.fromEntries(
							Object.entries(categoryData).map((entry) => [
								entry[0],
								(entry[1] as any)?.map((category) => ({
									...category,
									checked: !isAllChecked,
								})),
							])
						)
					);

					setIsAllChecked(!isAllChecked);
				}}
			>
				{isAllChecked ? 'Unselect All' : 'Select All'}
			</Button>

			<p>Your Picks</p>
			{Object.entries(yourPicks).map(([key, value]) => (
				<div> {value}</div>
			))}
		</div>
	);
};

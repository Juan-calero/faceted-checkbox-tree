import React from 'react';
import { Button } from '../design-system/button/button';
import { CategoryDataContext } from '../contexts/category-data-context';
import { Styled } from './user-selection.styles';

export const UserSelection = () => {
	const { categoryData, yourPicks, setYourPicks } =
		React.useContext(CategoryDataContext);
	const [isAllChecked, setIsAllChecked] = React.useState(false);

	return (
		<Styled.UserSelectionWrapper>
			<Button
				onClick={() => {
					setYourPicks(
						Object.keys(yourPicks).reduce(
							(accumulator, key) => ({
								...accumulator,
								[key]: { ...yourPicks[key], selected: !isAllChecked },
							}),
							{}
						)
					);
					setIsAllChecked(!isAllChecked);
				}}
			>
				{isAllChecked ? 'Unselect All' : 'Select All'}
			</Button>
			<h3 style={{ margin: '0' }}>Your picks</h3>
			<div style={{ overflow: 'scroll', height: '100%' }}>
				{Object.entries(yourPicks).map(([key, { name, selected }]) =>
					selected && !categoryData[key] ? (
						<p style={{ margin: '0' }}>{name}</p>
					) : null
				)}
			</div>
		</Styled.UserSelectionWrapper>
	);
};

import React from 'react';
import { CategoryDataContext } from '../contexts/category-data-context';
import { Styled } from './selected-categories.styles';
import { TextButton } from '../design-system';

export const SelectedCategories: React.FC = () => {
	const {
		categoryData,
		chosenCategories,
		toggleSelection,
		toggleAllSelections,
	} = React.useContext(CategoryDataContext);

	const [isAllChecked, setIsAllChecked] = React.useState(false);

	return (
		<Styled.SelectedCategoriesWrapper>
			<Styled.Button
				onClick={() => {
					toggleAllSelections(!isAllChecked);
					setIsAllChecked(!isAllChecked);
				}}
				active={isAllChecked}
			>
				{isAllChecked ? 'Unselect all' : 'Select all'}
			</Styled.Button>
			<Styled.Heading>Your picks</Styled.Heading>
			<Styled.Separator />
			<Styled.ChosenCategories>
				{Object.entries(chosenCategories).map(([key, { name, selected }]) =>
					selected && !categoryData[key] ? (
						<TextButton
							key={key}
							onClick={() => toggleSelection(key, name, false)}
						>
							{name}
						</TextButton>
					) : null
				)}
			</Styled.ChosenCategories>
		</Styled.SelectedCategoriesWrapper>
	);
};

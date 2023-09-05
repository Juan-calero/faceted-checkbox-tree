import React from 'react';
import { Button } from '../design-system/button/button';
import { CategoryDataContext } from '../contexts/category-data-context';
import { Styled } from './user-selection.styles';
import { TextButton } from '../design-system/text-button';

export const UserSelection: React.FC = () => {
	const {
		categoryData,
		chosenCategories,
		toggleSelection,
		toggleAllSelections,
	} = React.useContext(CategoryDataContext);
	const [isAllChecked, setIsAllChecked] = React.useState(false);

	return (
		<Styled.UserSelectionWrapper>
			<Button
				onClick={() => {
					toggleAllSelections(!isAllChecked);
					setIsAllChecked(!isAllChecked);
				}}
				active={isAllChecked}
			>
				{isAllChecked ? 'Unselect All' : 'Select All'}
			</Button>
			<Styled.Heading>Your picks</Styled.Heading>
			<Styled.Separator />
			<Styled.ChosenCategories>
				{Object.entries(chosenCategories).map(([key, { name, selected }]) =>
					selected && !categoryData[key] ? (
						<TextButton
							onClick={() => toggleSelection({ key, name, selected: false })}
						>
							{name}
						</TextButton>
					) : null
				)}
			</Styled.ChosenCategories>
		</Styled.UserSelectionWrapper>
	);
};

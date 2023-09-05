import styled from 'styled-components';
import {
	colorWhite,
	space4XL,
	space6XL,
	spaceS,
	spaceM,
	Button,
} from '../design-system';

const SelectedCategoriesWrapper = styled.section`
	display: flex;
	flex-direction: column;
	width: calc(${space6XL} * 3);
	margin-right: ${spaceM};
`;

const StyledButton = styled(Button)`
	align-self: start;
`;

const Heading = styled.h3`
	margin: ${spaceS} 0 0;
`;

const Separator = styled.hr`
	border: 1px solid ${colorWhite};
	margin: ${spaceS} ${space4XL} ${spaceS} 0;
`;

const ChosenCategories = styled.div`
	overflow: auto;
`;

export const Styled = {
	SelectedCategoriesWrapper,
	Button: StyledButton,
	Heading,
	Separator,
	ChosenCategories,
};

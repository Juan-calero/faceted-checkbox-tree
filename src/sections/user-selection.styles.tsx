import styled from 'styled-components';
import {
	colorWhite,
	space4XL,
	space6XL,
	spaceS,
	spaceM,
} from '../design-system';

const UserSelectionWrapper = styled.section`
	width: calc(${space6XL} * 3);
	margin-right: ${spaceM};
	overflow: hidden;
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
	height: 100%;
`;

export const Styled = {
	UserSelectionWrapper,
	Heading,
	Separator,
	ChosenCategories,
};

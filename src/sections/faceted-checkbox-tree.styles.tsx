import styled from 'styled-components';
import { colorDarkBrown, space6XL, spaceXXL } from '../design-system';

const CheckboxTreeWrapper = styled.section`
	height: fit-content;
	width: calc(${space6XL} * 3);
	font-size: ${spaceXXL};
	overflow: auto;
	border: 1px solid ${colorDarkBrown};
`;

export const Styled = {
	CheckboxTreeWrapper,
};

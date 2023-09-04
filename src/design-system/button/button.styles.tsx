import styled from 'styled-components';

import {
	colorDarkBrown,
	colorTextBege,
	spaceL,
	spaceS,
	spaceXS,
} from '../tokens';

const Button = styled.button`
	padding: ${spaceS} ${spaceL};
	color: ${colorDarkBrown};
	background: ${colorTextBege};
	font-size: ${spaceL};
	cursor: pointer;
	border-radius: ${spaceXS};
	border: 1px solid ${colorDarkBrown};
`;

export const Styled = {
	Button,
};

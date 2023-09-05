import styled, { css } from 'styled-components';

import {
	colorDarkBrown,
	colorTextBege,
	spaceL,
	spaceS,
	spaceXS,
} from '../tokens';

const Button = styled.button<{ $active: boolean }>`
	padding: ${spaceS} ${spaceL};
	background: ${colorDarkBrown};
	color: ${colorTextBege};
	font-size: ${spaceL};
	cursor: pointer;
	border-radius: ${spaceXS};
	border: 1px solid ${colorDarkBrown};
	${({ $active }) =>
		$active &&
		css`
			background: transparent;
			color: ${colorDarkBrown};
		`}
`;

export const Styled = {
	Button,
};

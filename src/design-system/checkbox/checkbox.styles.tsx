import styled, { css } from 'styled-components';

import {
	colorDarkBrown,
	colorTextBege,
	spaceXXL,
	spaceL,
	spaceS,
	spaceXL,
} from '../tokens';
import { CheckboxType } from './checkbox';

const RADIO_BUTTON_VARIANTS = {
	parent: css`
		background: ${colorDarkBrown};
		color: ${colorTextBege};
	`,
	child: css`
		background: ${colorTextBege};
		color: ${colorDarkBrown};
		border-left: 3px solid ${colorDarkBrown};
	`,
};

const Wrapper = styled.div<{ $variant: CheckboxType['variant'] }>`
	width: 100%;
	display: flex;
	padding: ${spaceS} ${spaceL};
	font-size: ${spaceL};
	cursor: pointer;
	${({ $variant }) => $variant && RADIO_BUTTON_VARIANTS[$variant]}
`;

const Checkbox = styled.input<{ $depth?: number }>`
	margin: 0 ${spaceS} 0 0;
	padding: 0 ${spaceS};
	background: ${colorDarkBrown};
	color: ${colorTextBege};
	font-size: ${spaceL};
	cursor: pointer;
	${({ $depth }) =>
		$depth &&
		css`
			margin-left: calc(${spaceXXL} * ${$depth});
		`}
`;

const IconButton = styled.button`
	margin-left: auto;
	height: ${spaceXL};
	width: ${spaceXL};
	color: ${colorDarkBrown};
	font-size: ${spaceL};
	border-radius: 50%;
	border: 1px solid ${colorDarkBrown};
	background: transparent;
	transform: rotate(90deg);
	cursor: pointer;
`;

export const Styled = {
	Wrapper,
	Checkbox,
	IconButton,
};

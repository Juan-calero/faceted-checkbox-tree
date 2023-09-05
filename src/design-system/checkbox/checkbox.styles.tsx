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

const CHECKBOX_VARIANTS = {
	parent: css`
		background: ${colorDarkBrown};
		color: ${colorTextBege};
	`,
	child: css`
		background: ${colorTextBege};
		color: ${colorDarkBrown};
	`,
};

const ICON_BUTTON_VARIANTS = {
	parent: css`
		color: ${colorTextBege};
		border: 1px solid ${colorTextBege};
	`,
	child: css`
		color: ${colorDarkBrown};
		border: 1px solid ${colorDarkBrown};
	`,
};

const Wrapper = styled.div<{ $variant: CheckboxType['variant'] }>`
	display: flex;
	padding: ${spaceS} ${spaceL};
	font-size: ${spaceL};
	cursor: pointer;
	${({ $variant }) => $variant && CHECKBOX_VARIANTS[$variant]}
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

const IconButton = styled.button<{ $variant: CheckboxType['variant'] }>`
	margin-left: auto;
	height: ${spaceXL};
	width: ${spaceXL};
	font-size: ${spaceL};
	border-radius: 50%;
	background: transparent;
	cursor: pointer;
	${({ $variant }) => $variant && ICON_BUTTON_VARIANTS[$variant]}
`;

export const Styled = {
	Wrapper,
	Checkbox,
	IconButton,
};

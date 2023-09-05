import styled from 'styled-components';

import { colorDarkBege, colorWhite, spaceS } from '../tokens';

const TextButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-radius: ${spaceS};
	padding: 0 ${spaceS};

	&:hover,
	&:focus {
		background: ${colorDarkBege};
	}
`;

const Content = styled.p`
	margin: 0;
	user-select: none;
`;

const CloseButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: ${colorWhite};
	font-weight: bold;
`;

export const Styled = {
	TextButtonWrapper,
	Content,
	CloseButton,
};

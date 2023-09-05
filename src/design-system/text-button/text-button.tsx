import React from 'react';
import { Styled } from './text-button.styles';

export type TextButtonType = {
	children: React.ReactNode;
	onClick: () => void;
};

export const TextButton: React.FC<TextButtonType> = ({ onClick, children }) => {
	const [hover, setHover] = React.useState(false);

	return (
		<Styled.TextButtonWrapper
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Styled.Content>{children}</Styled.Content>
			{hover && <Styled.CloseButton {...{ onClick }}>X</Styled.CloseButton>}
		</Styled.TextButtonWrapper>
	);
};

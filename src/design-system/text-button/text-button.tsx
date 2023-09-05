import React from 'react';
import { Styled } from './text-button.styles';

export type TextButtonType = {
	children: React.ReactNode;
	onClick: () => void;
	[props: string]: unknown;
};

export const TextButton: React.FC<TextButtonType> = ({
	onClick,
	children,
	...props
}) => {
	const [hover, setHover] = React.useState(false);

	return (
		<Styled.TextButtonWrapper
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			{...props}
		>
			<Styled.Content>{children}</Styled.Content>
			{hover && <Styled.CloseButton {...{ onClick }}>X</Styled.CloseButton>}
		</Styled.TextButtonWrapper>
	);
};

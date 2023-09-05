import React from 'react';
import { Styled } from './button.styles';

export type ButtonType = {
	active?: boolean;
	children: React.ReactNode;
	className?: string;
	onClick: () => void;
	[props: string]: unknown;
};

export const Button: React.FC<ButtonType> = ({
	active = false,
	children,
	onClick,
	...props
}) => (
	<Styled.Button $active={active} {...{ onClick, ...props }}>
		{children}
	</Styled.Button>
);

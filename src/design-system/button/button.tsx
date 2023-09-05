import React from 'react';
import { Styled } from './button.styles';

export type ButtonType = {
	children: React.ReactNode;
	onClick: () => void;
	active?: boolean;
	[prop: string]: unknown;
};

export const Button: React.FC<ButtonType> = ({
	onClick,
	children,
	active = false,
	...props
}) => (
	<Styled.Button $active={active} {...{ onClick, ...props }}>
		{children}
	</Styled.Button>
);

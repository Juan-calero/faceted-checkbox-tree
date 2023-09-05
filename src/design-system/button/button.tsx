import React from 'react';
import { Styled } from './button.styles';

export type ButtonType = {
	active?: boolean;
	children: React.ReactNode;
	className?: string;
	onClick: () => void;
};

export const Button: React.FC<ButtonType> = ({
	active = false,
	children,
	className,
	onClick,
}) => (
	<Styled.Button $active={active} {...{ onClick, className }}>
		{children}
	</Styled.Button>
);

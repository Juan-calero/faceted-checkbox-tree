import React from 'react';
import { Styled } from './checkbox.styles';

export type CheckboxType = {
	checked?: boolean;
	children?: React.ReactNode;
	depth?: number;
	hasChild?: boolean;
	onClick: () => void;
	onChange: () => void;
	variant?: 'parent' | 'child';
	[prop: string]: unknown;
};

export const Checkbox: React.FC<CheckboxType> = ({
	checked = false,
	children,
	depth = 0,
	hasChild,
	onClick,
	onChange,
	variant = 'child',
	...props
}) => (
	<Styled.Wrapper $variant={variant}>
		<Styled.Checkbox
			type="checkbox"
			$depth={depth}
			{...{ checked, onChange, ...props }}
		/>
		<label>{children}</label>
		{hasChild && <Styled.IconButton {...{ onClick }}>{'<'}</Styled.IconButton>}
	</Styled.Wrapper>
);

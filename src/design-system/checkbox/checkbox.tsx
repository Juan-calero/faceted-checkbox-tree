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
	expanded,
	...props
}) => (
	<Styled.Wrapper $variant={variant}>
		<Styled.Checkbox
			type="checkbox"
			$depth={depth}
			{...{ checked, onChange, ...props }}
		/>
		<label>{children}</label>
		{hasChild && (
			<Styled.IconButton $variant={variant} {...{ onClick }}>
				{expanded ? '-' : '+'}
			</Styled.IconButton>
		)}
	</Styled.Wrapper>
);

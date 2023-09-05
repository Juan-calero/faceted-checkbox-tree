import React from 'react';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { CheckboxType } from './checkbox';

const mockWrapper = jest.fn(({ children }) => children);
const mockCheckbox = jest.fn(() => <span>Checkbox</span>);
const mockIconButton = jest.fn(({ onClick }) => (
	<span {...{ onClick }}>IconButton</span>
));
jest.mock('./checkbox.styles', () => ({
	Styled: {
		Wrapper: mockWrapper,
		Checkbox: mockCheckbox,
		IconButton: mockIconButton,
	},
}));

const DEFAULT_PROPS: CheckboxType = {
	checked: true,
	children: 'mockChildren',
	depth: 12,
	expanded: false,
	hasChild: true,
	mockProp: 'mockProp',
	onChange: jest.fn(),
	onClick: jest.fn(),
	variant: 'parent',
};

describe('Checkbox', () => {
	let renderComponent: (props?: Partial<CheckboxType>) => RenderResult;

	beforeEach(async () => {
		const { Checkbox } = await import('./checkbox');
		renderComponent = (props) =>
			render(<Checkbox {...DEFAULT_PROPS} {...props} />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component              | mockComponent     | expectedProps
		${'Styled.Wrapper'}    | ${mockWrapper}    | ${{ children: expect.anything(), $variant: 'parent', onClick: DEFAULT_PROPS['onClick'], 'data-testid': `checkbox-${DEFAULT_PROPS['children']}-${DEFAULT_PROPS['depth']}` }}
		${'Styled.Checkbox'}   | ${mockCheckbox}   | ${{ $depth: DEFAULT_PROPS['depth'], checked: DEFAULT_PROPS['checked'], mockProp: DEFAULT_PROPS['mockProp'], onChange: DEFAULT_PROPS['onChange'], onClick: expect.any(Function), type: 'checkbox' }}
		${'Styled.IconButton'} | ${mockIconButton} | ${{ children: '+', $variant: 'parent' }}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});

	describe('Styled.IconButton', () => {
		it('does not render when hasChild is false', () => {
			renderComponent({ hasChild: false });
			expect(mockIconButton).toBeCalledTimes(0);
		});

		it('renders with correct children when expanded is true', () => {
			renderComponent({ expanded: true });
			expect(mockIconButton).toBeCalledTimes(1);
			expect(mockIconButton).toBeCalledWith(
				expect.objectContaining({ children: '-' }),
				{}
			);
		});
	});
});

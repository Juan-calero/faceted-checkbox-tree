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
	hasChild: true,
	mockProp: 'mockProp',
	onClick: jest.fn(),
	onChange: jest.fn(),
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
		${'Styled.Wrapper'}    | ${mockWrapper}    | ${{ children: expect.anything(), $variant: 'parent' }}
		${'Styled.Checkbox'}   | ${mockCheckbox}   | ${{ $depth: DEFAULT_PROPS['depth'], checked: DEFAULT_PROPS['checked'], mockProp: DEFAULT_PROPS['mockProp'], onChange: DEFAULT_PROPS['onChange'], type: 'checkbox' }}
		${'Styled.IconButton'} | ${mockIconButton} | ${{ children: '<', onClick: DEFAULT_PROPS['onClick'] }}
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
	});
});

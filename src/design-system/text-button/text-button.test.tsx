import React from 'react';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

let mockHover = true;
const mockSetHover = jest.fn();
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: () => [mockHover, mockSetHover],
}));

const mockTextButtonWrapper = jest.fn(({ children }) => children);
const mockContent = jest.fn(({ children }) => children);
const mockCloseButton = jest.fn(() => <span>CloseButton</span>);
jest.mock('./text-button.styles', () => ({
	Styled: {
		TextButtonWrapper: mockTextButtonWrapper,
		Content: mockContent,
		CloseButton: mockCloseButton,
	},
}));

const DEFAULT_PROPS = {
	onClick: jest.fn(),
	children: 'mockChildren',
};

describe('Button', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { TextButton } = await import('./text-button');
		renderComponent = () => render(<TextButton {...DEFAULT_PROPS} />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component              | mockComponent            | expectedProps
		${'TextButtonWrapper'} | ${mockTextButtonWrapper} | ${{ children: expect.anything(), onMouseEnter: expect.any(Function), onMouseLeave: expect.any(Function) }}
		${'Content'}           | ${mockContent}           | ${{ children: DEFAULT_PROPS['children'] }}
		${'CloseButton'}       | ${mockCloseButton}       | ${{ children: 'X', onClick: DEFAULT_PROPS['onClick'] }}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});

	describe('TextButtonWrapper', () => {
		it.each`
			onEvent           | expectedProps
			${'onMouseEnter'} | ${true}
			${'onMouseLeave'} | ${false}
		`(
			'calls setHover with correct arguments $onEvent',
			({ onEvent, expectedProps }) => {
				renderComponent();
				mockTextButtonWrapper.mock.calls[0][0][onEvent]();
				expect(mockSetHover).toBeCalledTimes(1);
				expect(mockSetHover).toBeCalledWith(expectedProps);
			}
		);
	});

	describe('CloseButton', () => {
		afterEach(() => (mockHover = true));

		it('does not render when hover is false', () => {
			mockHover = false;
			renderComponent();
			expect(mockCloseButton).toBeCalledTimes(0);
		});
	});
});

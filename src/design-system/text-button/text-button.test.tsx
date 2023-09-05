import React from 'react';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

const mockButton = jest.fn(({ children }) => children);
jest.mock('./text-button.styles', () => ({
	Styled: { Button: mockButton },
}));

const mockClick = jest.fn();
const DEFAULT_PROPS = {
	onClick: mockClick,
	children: 'mockChildren',
};

describe('Button', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { TextButton } = await import('./text-button');
		renderComponent = () => render(<TextButton {...DEFAULT_PROPS} />);
	});

	afterEach(jest.clearAllMocks);

	describe('Button', () => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockButton).toBeCalledTimes(1);
			expect(mockButton).toBeCalledWith(
				{ children: 'mockChildren', onClick: expect.any(Function) },
				{}
			);
		});

		it('calls onClick function onClick', () => {
			renderComponent();
			mockButton.mock.calls[0][0].onClick();

			expect(mockClick).toBeCalledTimes(1);
			expect(mockClick).toBeCalledWith();
		});
	});
});

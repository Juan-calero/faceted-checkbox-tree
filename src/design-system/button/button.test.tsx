import React from 'react';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

const mockButton = jest.fn(({ children }) => children);
jest.mock('./button.styles', () => ({
	Styled: { Button: mockButton },
}));

const DEFAULT_PROPS = {
	active: false,
	onClick: jest.fn(),
	children: 'mockChildren',
};

describe('Button', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { Button } = await import('./button');
		renderComponent = () => render(<Button {...DEFAULT_PROPS} />);
	});

	afterEach(jest.clearAllMocks);

	describe('Button', () => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockButton).toBeCalledTimes(1);
			expect(mockButton).toBeCalledWith(
				{
					$active: false,
					children: 'mockChildren',
					onClick: expect.any(Function),
				},
				{}
			);
		});

		it('calls onClick function onClick', () => {
			renderComponent();
			mockButton.mock.calls[0][0].onClick();

			expect(DEFAULT_PROPS['onClick']).toBeCalledTimes(1);
			expect(DEFAULT_PROPS['onClick']).toBeCalledWith();
		});
	});
});

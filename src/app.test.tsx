import React from 'react';
import { render, RenderResult } from '@testing-library/react';

const mockCategoryDataContextWrapper = jest.fn(({ children }) => children);
jest.mock('./contexts/category-data-context-wrapper', () => ({
	CategoryDataContextWrapper: mockCategoryDataContextWrapper,
}));

const mockPage = jest.fn(({ children }) => children);
const mockColumns = jest.fn(({ children }) => children);
jest.mock('./app.styles', () => ({
	Styled: {
		Page: mockPage,
		Columns: mockColumns,
	},
}));

const mockCheckboxTree = jest.fn(() => <span>CheckboxTree</span>);
const mockSelectedCategories = jest.fn(() => <span>SelectedCategories</span>);
jest.mock('./sections', () => ({
	CheckboxTree: mockCheckboxTree,
	SelectedCategories: mockSelectedCategories,
}));

describe('App', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { App } = await import('./app');
		renderComponent = () => render(<App />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component                       | mockComponent                     | expectedProps
		${'CategoryDataContextWrapper'} | ${mockCategoryDataContextWrapper} | ${{ children: expect.anything() }}
		${'Styled.Page'}                | ${mockPage}                       | ${{ children: expect.anything() }}
		${'SelectedCategories'}         | ${mockSelectedCategories}         | ${{}}
		${'CheckboxTree'}               | ${mockCheckboxTree}               | ${{}}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});
});

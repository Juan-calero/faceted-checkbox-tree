import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CategoryDataContextType } from '../contexts/category-data-context';

let DEFAULT_CONTEXT_PROPS = {
	categoryData: {
		'0': [{ categoryId: 'mockCategoryId', name: 'mockName' }],
	} as CategoryDataContextType['categoryData'],
};
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useContext: () => DEFAULT_CONTEXT_PROPS,
}));

const mockCategoryGroup = jest.fn(() => <span>CategoryGroup</span>);
jest.mock('./category-group', () => ({
	CategoryGroup: mockCategoryGroup,
}));

const mockCheckboxTreeWrapper = jest.fn(({ children }) => children);
jest.mock('./checkbox-tree.styles', () => ({
	Styled: {
		CheckboxTreeWrapper: mockCheckboxTreeWrapper,
	},
}));

describe('CheckboxTree', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { CheckboxTree } = await import('./checkbox-tree');
		renderComponent = () => render(<CheckboxTree />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component                | mockComponent              | expectedProps
		${'CheckboxTreeWrapper'} | ${mockCheckboxTreeWrapper} | ${{ children: expect.anything() }}
		${'CategoryGroup'}       | ${mockCategoryGroup}       | ${{ categoryId: DEFAULT_CONTEXT_PROPS['categoryData']['0'][0].categoryId, depth: 0, name: DEFAULT_CONTEXT_PROPS['categoryData']['0'][0].name, parent: true, show: true }}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});

	describe('CategoryGroup', () => {
		afterEach(
			() =>
				(DEFAULT_CONTEXT_PROPS = {
					categoryData: {
						'0': [{ categoryId: 'mockCategoryId', name: 'mockName' }],
					},
				})
		);

		it('does not render when there is no categoryData', () => {
			DEFAULT_CONTEXT_PROPS = { categoryData: {} };
			renderComponent();
			expect(mockCategoryGroup).toBeCalledTimes(0);
		});

		it('renders correctly when there is more than 1 category group', () => {
			DEFAULT_CONTEXT_PROPS = {
				categoryData: {
					'0': [
						{ categoryId: 'mockCategoryId1', name: 'mockName1' },
						{ categoryId: 'mockCategoryId2', name: 'mockName2' },
					],
				},
			};
			renderComponent();
			expect(mockCategoryGroup).toBeCalledTimes(2);
		});
	});
});

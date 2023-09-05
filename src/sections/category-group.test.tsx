import React, { useState as useStateMock } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CategoryDataContextType } from '../contexts/category-data-context';
import type { CategoryGroupType } from './category-group';

let DEFAULT_CONTEXT_PROPS = {
	categoryData: {
		'0': [{ categoryId: 'mockCategoryId', name: 'mockName' }],
	} as CategoryDataContextType['categoryData'],
	chosenCategories: { mockCategoryId: { selected: false } },
	toggleSelection: jest.fn(),
};
const mockExpandCategoryGroup = false;
const mockChecked = false;
const mockSetExpandCategoryGroup = jest.fn();
const mockSetChecked = jest.fn();
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useContext: () => DEFAULT_CONTEXT_PROPS,
	useEffect: () => {},
	useState: jest.fn(),
}));

const mockCheckbox = jest.fn(({ onClick, onChange }) => (
	<span {...{ onClick, onDoubleClick: onChange }}>Checkbox</span>
));
jest.mock('../design-system', () => ({
	Checkbox: mockCheckbox,
}));

const mockCategoryGroupWrapper = jest.fn(({ children }) => children);
jest.mock('./category-group.styles', () => ({
	Styled: {
		CategoryGroupWrapper: mockCategoryGroupWrapper,
	},
}));

const DEFAULT_PROPS = {
	show: false,
	checked: false,
	categoryId: 'mockCategoryId',
	depth: 12,
	parent: false,
	name: 'mockName',
};

describe('CategoryGroup', () => {
	let renderComponent: (props?: Partial<CategoryGroupType>) => RenderResult;

	beforeEach(async () => {
		const { CategoryGroup } = await import('./category-group');
		(useStateMock as jest.Mock)
			.mockReturnValueOnce([
				mockExpandCategoryGroup,
				mockSetExpandCategoryGroup,
			])
			.mockReturnValueOnce([mockChecked, mockSetChecked]);
		renderComponent = (props) =>
			render(<CategoryGroup {...DEFAULT_PROPS} {...props} />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component                 | mockComponent               | expectedProps
		${'CategoryGroupWrapper'} | ${mockCategoryGroupWrapper} | ${{ children: expect.anything(), $show: DEFAULT_PROPS['show'] }}
		${'Checkbox'}             | ${mockCheckbox}             | ${{ checked: DEFAULT_PROPS['checked'], children: DEFAULT_PROPS['name'], depth: DEFAULT_PROPS['depth'], expanded: false, hasChild: false, onChange: expect.any(Function), onClick: expect.any(Function), variant: 'child' }}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});

	describe('Checkbox', () => {
		it('calls setExpandCategoryGroup with correct params onClick', () => {
			renderComponent();
			mockCheckbox.mock.calls[0][0].onClick();
			expect(mockSetExpandCategoryGroup).toBeCalledTimes(1);
			expect(mockSetExpandCategoryGroup).toBeCalledWith(
				!mockExpandCategoryGroup
			);
		});

		it.each`
			callback             | mockCallback                                | expectedResult
			${'toggleSelection'} | ${DEFAULT_CONTEXT_PROPS['toggleSelection']} | ${[DEFAULT_PROPS['categoryId'], DEFAULT_PROPS['name'], true]}
			${'setChecked'}      | ${mockSetChecked}                           | ${[!mockChecked]}
		`(
			'calls $callback with correct params onChange',
			({ mockCallback, expectedResult }) => {
				renderComponent();
				mockCheckbox.mock.calls[0][0].onChange();
				expect(mockCallback).toBeCalledTimes(1);
				expect(mockCallback).toBeCalledWith(...expectedResult);
			}
		);
	});
});

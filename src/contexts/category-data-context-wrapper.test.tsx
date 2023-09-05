import React, { useState as useStateMock } from 'react';
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { CategoryDataContextWrapperType } from './category-data-context-wrapper';

const mockSetCategoryData = jest.fn();
const mockChosenCategories = {
	mockChosenCategoryKey: { name: 'mockChosenCategoryName', selected: false },
	mockAnotherChosenCategoryKey: {
		name: 'mockAnotherChosenCategoryName',
		selected: false,
	},
};
const mockSetChosenCategories = jest.fn();
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
	useEffect: () => {},
}));

const mockCategoryDataContextProvider = jest.fn(({ children }) => children);
jest.mock('./category-data-context', () => ({
	CategoryDataContext: { Provider: mockCategoryDataContextProvider },
}));

const DEFAULT_PROPS = {
	children: 'mockChildren',
};

describe('CategoryDataContextWrapper', () => {
	let renderComponent: (
		props?: Partial<CategoryDataContextWrapperType>
	) => RenderResult;

	beforeEach(async () => {
		const { CategoryDataContextWrapper } = await import(
			'./category-data-context-wrapper'
		);
		(useStateMock as jest.Mock)
			.mockReturnValueOnce(['mockCategoryData', mockSetCategoryData])
			.mockReturnValueOnce([mockChosenCategories, mockSetChosenCategories]);
		renderComponent = (props) =>
			render(<CategoryDataContextWrapper {...DEFAULT_PROPS} {...props} />);
	});

	afterEach(jest.clearAllMocks);

	describe('CategoryDataContextWrapper', () => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockCategoryDataContextProvider).toBeCalledTimes(1);
			expect(mockCategoryDataContextProvider).toBeCalledWith(
				{
					children: DEFAULT_PROPS['children'],
					value: {
						categoryData: 'mockCategoryData',
						chosenCategories: mockChosenCategories,
						setCategoryData: expect.any(Function),
						toggleAllSelections: expect.any(Function),
						toggleSelection: expect.any(Function),
					},
				},
				{}
			);
		});

		it('toggles all selections (based on chosenCategories` keys), on toggleAllSelections', () => {
			renderComponent();
			mockCategoryDataContextProvider.mock.calls[0][0].value.toggleAllSelections(
				true
			);

			expect(mockSetChosenCategories).toBeCalledTimes(1);
			expect(mockSetChosenCategories).toBeCalledWith({
				mockChosenCategoryKey: {
					name: 'mockChosenCategoryName',
					selected: true,
				},
				mockAnotherChosenCategoryKey: {
					name: 'mockAnotherChosenCategoryName',
					selected: true,
				},
			});
		});

		it('toggles a single selection (based on it`s key), on toggleSelection', () => {
			renderComponent();
			mockCategoryDataContextProvider.mock.calls[0][0].value.toggleSelection({
				key: 'mockKey',
				name: 'mockName',
				selected: true,
			});

			expect(mockSetChosenCategories).toBeCalledTimes(1);
			expect(mockSetChosenCategories).toBeCalledWith({
				...mockChosenCategories,
				mockKey: { name: 'mockName', selected: true },
			});
		});
	});
});

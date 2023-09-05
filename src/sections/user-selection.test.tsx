import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CategoryDataContextType } from '../contexts/category-data-context';

const DEFAULT_CONTEXT_PROPS = {
	categoryData: {
		'0': [{ categoryId: 'mockCategoryId', name: 'mockName' }],
	} as CategoryDataContextType['categoryData'],
	chosenCategories: {
		'1': { name: 'mockName1', selected: false },
		'2': { name: 'mockName2', selected: true },
	},
	toggleAllSelections: jest.fn(),
	toggleSelection: jest.fn(),
};
let mockIsAllChecked = false;
const mockSetIsAllChecked = jest.fn();
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useContext: () => DEFAULT_CONTEXT_PROPS,
	useState: () => [mockIsAllChecked, mockSetIsAllChecked],
}));

const mockButton = jest.fn(({ children }) => children);
const mockTextButton = jest.fn(({ children }) => children);
jest.mock('../design-system', () => ({
	Button: mockButton,
	TextButton: mockTextButton,
}));

const mockUserSelectionWrapper = jest.fn(({ children }) => children);
const mockHeading = jest.fn(({ children }) => children);
const mockSeparator = jest.fn(({ children }) => children);
const mockChosenCategories = jest.fn(({ children }) => children);
jest.mock('./user-selection.styles', () => ({
	Styled: {
		UserSelectionWrapper: mockUserSelectionWrapper,
		Heading: mockHeading,
		Separator: mockSeparator,
		ChosenCategories: mockChosenCategories,
	},
}));

describe('UserSelection', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { UserSelection } = await import('./user-selection');
		renderComponent = () => render(<UserSelection />);
	});

	afterEach(jest.clearAllMocks);

	describe.each`
		component                        | mockComponent               | expectedProps
		${'Styled.UserSelectionWrapper'} | ${mockUserSelectionWrapper} | ${{ children: expect.anything() }}
		${'Button'}                      | ${mockButton}               | ${{ children: 'Select all', active: mockIsAllChecked, onClick: expect.any(Function) }}
		${'Styled.Heading'}              | ${mockHeading}              | ${{ children: 'Your picks' }}
		${'Styled.Separator'}            | ${mockSeparator}            | ${{}}
		${'Styled.ChosenCategories'}     | ${mockChosenCategories}     | ${{ children: expect.anything() }}
		${'TextButton'}                  | ${mockTextButton}           | ${{ children: DEFAULT_CONTEXT_PROPS['chosenCategories'][2].name, onClick: expect.any(Function) }}
	`('$component', ({ mockComponent, expectedProps }) => {
		it('renders with correct params', () => {
			renderComponent();
			expect(mockComponent).toBeCalledTimes(1);
			expect(mockComponent).toBeCalledWith(expectedProps, {});
		});
	});

	describe('Button', () => {
		afterEach(() => (mockIsAllChecked = false));

		it('renders with correct params when isAllChecked is true', () => {
			mockIsAllChecked = true;
			renderComponent();
			expect(mockButton).toBeCalledTimes(1);
			expect(mockButton).toBeCalledWith(
				expect.objectContaining({ children: 'Unselect all', active: true }),
				{}
			);
		});

		it.each`
			callback                 | mockCallback
			${'toggleAllSelections'} | ${DEFAULT_CONTEXT_PROPS['toggleAllSelections']}
			${'setIsAllChecked'}     | ${mockSetIsAllChecked}
		`('calls $callback with correct arguments onClick', ({ mockCallback }) => {
			renderComponent();
			mockButton.mock.calls[0][0].onClick();
			expect(mockCallback).toBeCalledTimes(1);
			expect(mockCallback).toBeCalledWith(!mockIsAllChecked);
		});
	});

	describe('TextButton', () => {
		afterEach(
			() =>
				(DEFAULT_CONTEXT_PROPS['chosenCategories'] = {
					'1': { name: 'mockName1', selected: false },
					'2': { name: 'mockName2', selected: true },
				})
		);

		it.each`
			scenario                                                         | chosenCategories
			${'selected is false'}                                           | ${{ '1': { name: 'mockName1', selected: false } }}
			${'there is a categoryData with that key'}                       | ${{ '0': { name: 'mockName1', selected: true } }}
			${'selected is false and there is a categoryData with that key'} | ${{ '0': { name: 'mockName1', selected: false } }}
		`('does not render when $scenario', ({ chosenCategories }) => {
			DEFAULT_CONTEXT_PROPS['chosenCategories'] = chosenCategories;
			renderComponent();
			expect(mockTextButton).toBeCalledTimes(0);
		});

		it('calls toggleSelection with correct arguments onClick', () => {
			renderComponent();
			mockTextButton.mock.calls[0][0].onClick();
			expect(DEFAULT_CONTEXT_PROPS['toggleSelection']).toBeCalledTimes(1);
			expect(DEFAULT_CONTEXT_PROPS['toggleSelection']).toBeCalledWith({
				key: '2',
				name: DEFAULT_CONTEXT_PROPS['chosenCategories'][2].name,
				selected: false,
			});
		});
	});
});
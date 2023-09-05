import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { MOCK_CHOSEN_CATEGORIES } from './mocks';
import '@testing-library/jest-dom';

jest.mock('../api/response.json', () => MOCK_CHOSEN_CATEGORIES);

const PARENT_CHECKBOX = 'checkbox-Herr-0';
const CHILD_CHECKBOX = 'checkbox-Stiefel-1';
const LEAF_GRANDCHILD_CHECKBOX = 'checkbox-Kapuzenpullover-2';
const OTHER_CHILD_CHECKBOX = 'checkbox-Jacke-1';

describe('App', () => {
	let renderComponent: () => RenderResult;

	beforeEach(async () => {
		const { App } = await import('../app');
		renderComponent = () => render(<App />);
	});

	afterEach(jest.clearAllMocks);

	describe('Instruction 1. - Category Tree UI', () => {
		it('Checkbox tree is displayed with correct items and depth', () => {
			const { queryByTestId } = renderComponent();

			// Number represents the nested level, 0 being the outtermost parent
			expect(queryByTestId(PARENT_CHECKBOX)).toBeInTheDocument();
			expect(queryByTestId(CHILD_CHECKBOX)).toBeInTheDocument();
			expect(queryByTestId(LEAF_GRANDCHILD_CHECKBOX)).toBeInTheDocument();
			expect(queryByTestId(OTHER_CHILD_CHECKBOX)).toBeInTheDocument();
		});
	});

	describe('Instruction 2. - Hierarchy Display', () => {
		it('Initially, only parent categories should be displayed.', () => {
			const { queryAllByTestId } = renderComponent();
			expect(queryAllByTestId('category-group-show')).toHaveLength(1);
		});

		it('Clicking on a category name expands the tree, by showing all of it`s direct children', () => {
			const { queryAllByTestId, container } = renderComponent();

			// Only the parent is displayed initially
			expect(queryAllByTestId('category-group-show')).toHaveLength(1);

			const category = container.querySelector(
				"[data-testid='category-group-show'] > div"
			);
			// Clicking on the Category to expand it
			fireEvent.click(category!);

			// Both the parent and it's children are now displayed
			expect(queryAllByTestId('category-group-show')).toHaveLength(3);
		});
	});

	describe('Instruction 3. - Category Selection', () => {
		it('Clicking on a category checkbox should select it if it is not selected already.', () => {
			const { container } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Checkbox is not selected initially
			expect(checkbox).not.toBeChecked();

			// Clicking on the Checkbox to select it
			fireEvent.click(checkbox!);

			// Checkbox is now selected
			expect(checkbox).toBeChecked();
		});

		it('Clicking on a category checkbox should deselect it if it is already selected.', () => {
			const { container } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Checkbox is selected
			fireEvent.click(checkbox!);
			expect(checkbox).toBeChecked();

			// Clicking on the Checkbox to deselect it
			fireEvent.click(checkbox!);

			// After clicking on the checkbox, it is now deselected
			expect(checkbox).not.toBeChecked();
		});
	});

	describe('Instruction 4. - Subcategory Selection', () => {
		it('Clicking on a parent category checkbox should select all it`s children if it is not selected already.', () => {
			const { container } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);
			const childCheckbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Checkbox of both parent and child are not selected initially
			expect(checkbox).not.toBeChecked();
			expect(childCheckbox).not.toBeChecked();

			// Clicking on the Checkbox to select it
			fireEvent.click(checkbox!);

			// Checkbox of both parent and child are now selected
			expect(checkbox).toBeChecked();
			expect(childCheckbox).toBeChecked();
		});

		it('Clicking on a parent category checkbox should deselect all it`s children if it is selected already.', () => {
			const { container } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${CHILD_CHECKBOX}'] > input`
			);
			const childCheckbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Checkbox of both parent and child are selected
			fireEvent.click(checkbox!);
			expect(checkbox).toBeChecked();
			expect(childCheckbox).toBeChecked();

			// Clicking on the Checkbox to deselect it
			fireEvent.click(checkbox!);

			// After clicking on the checkbox, both parent and child are now deselected
			expect(checkbox).not.toBeChecked();
			expect(childCheckbox).not.toBeChecked();
		});
	});

	describe('Instruction 5. - "Select All" button for user convenience.', () => {
		it('App starts with no selected items', () => {
			const { queryByTestId } = renderComponent();
			expect(queryByTestId(/^chosen-category-/)).toBeNull();
		});

		it('Clicking on the `select all` button populates all items in the chosen categories list', async () => {
			const { queryByTestId, getByTestId } = renderComponent();
			const button = getByTestId('button-select-all');
			fireEvent.click(button);

			// These are not populated because they are not leaf categories, they are parent categories
			expect(queryByTestId('chosen-category-Herr')).toBeNull();
			expect(queryByTestId('chosen-category-Stiefel')).toBeNull();

			// These are populated because they are leaf categories
			expect(queryByTestId('chosen-category-Jacke')).toBeInTheDocument();
			expect(
				queryByTestId('chosen-category-Kapuzenpullover')
			).toBeInTheDocument();
		});

		it('Clicking on the `unselect all` button removes all items from chosen categories list', async () => {
			const { queryByTestId, getByTestId } = renderComponent();

			const button = getByTestId('button-select-all');
			// Clicking on the button selects all leaf categories
			fireEvent.click(button);

			expect(queryByTestId('chosen-category-Jacke')).toBeInTheDocument();
			expect(
				queryByTestId('chosen-category-Kapuzenpullover')
			).toBeInTheDocument();

			// Clicking on the button again unselects all categories
			fireEvent.click(button);
			expect(queryByTestId(/^chosen-category-/)).toBeNull();
		});
	});

	describe('Instruction 6. - Display Selected Categories.', () => {
		it('Clicking on a category checkbox populates it in the chosen categories list', async () => {
			const { container, queryByTestId } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Click on the Kapuzenpullover checkbox
			fireEvent.click(checkbox!);

			// Kapuzenpullover is now populated in the chosen categories list
			expect(
				queryByTestId('chosen-category-Kapuzenpullover')
			).toBeInTheDocument();
		});

		it('Clicking on a category checkbox populates it in the chosen categories list', async () => {
			const { container, queryByTestId } = renderComponent();
			const checkbox = container.querySelector(
				`[data-testid='${LEAF_GRANDCHILD_CHECKBOX}'] > input`
			);

			// Kapuzenpullover is in the chosen categories list
			fireEvent.click(checkbox!);
			expect(
				queryByTestId('chosen-category-Kapuzenpullover')
			).toBeInTheDocument();

			// Deselect the Kapuzenpullover checkbox
			fireEvent.click(checkbox!);

			// Kapuzenpullover is now removed from the chosen categories list
			expect(
				queryByTestId('chosen-category-Kapuzenpullover')
			).not.toBeInTheDocument();
		});
	});
});

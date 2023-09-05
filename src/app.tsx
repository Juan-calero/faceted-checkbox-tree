import React from 'react';

import { CheckboxTree, SelectedCategories } from './sections';
import { Styled } from './app.styles';
import { CategoryDataContextWrapper } from './contexts';

export const App: React.FC = () => (
	<CategoryDataContextWrapper>
		<Styled.Page>
			<p>Juan Calero Faceted Checkbox Tree</p>
			<Styled.Columns>
				<SelectedCategories />
				<CheckboxTree />
			</Styled.Columns>
		</Styled.Page>
	</CategoryDataContextWrapper>
);

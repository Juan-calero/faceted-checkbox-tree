import React from 'react';

import { FacetedCheckboxTree, UserSelection } from './sections';
import { Styled } from './app.styles';
import { CategoryDataContextWrapper } from './contexts';

export const App: React.FC = () => (
	<CategoryDataContextWrapper>
		<Styled.Page>
			<p>Welcome to my project</p>
			<Styled.Columns>
				<UserSelection />
				<FacetedCheckboxTree />
			</Styled.Columns>
		</Styled.Page>
	</CategoryDataContextWrapper>
);

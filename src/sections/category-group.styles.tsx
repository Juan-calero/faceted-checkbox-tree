import styled from 'styled-components';

const CategoryGroupWrapper = styled.div<{ $show: boolean }>`
	${({ $show }) => !$show && 'display: none;'}
`;

export const Styled = {
	CategoryGroupWrapper,
};

import styled from 'styled-components';
import { colorWhite, spaceL, spaceXXL } from './design-system';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	max-height: calc(100vh - ${spaceXXL});
	width: calc(100vw - ${spaceXXL});
	font-size: ${spaceXXL};
	color: ${colorWhite};
	overflow: hidden;
	padding: ${spaceL};
`;

const Columns = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	overflow: hidden;
`;

export const Styled = {
	Page,
	Columns,
};

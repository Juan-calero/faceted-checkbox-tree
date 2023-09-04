import styled from 'styled-components';
import { colorLightBege, spaceXXL } from './design-system';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${colorLightBege};
	min-height: 100vh;
	width: 100vw;
	font-size: ${spaceXXL};
	color: white;
`;

const Columns = styled.div`
	display: flex;
	align-items: space-evenly;
`;

export const Styled = {
	Page,
	Columns,
};

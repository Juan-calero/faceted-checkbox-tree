import styled from 'styled-components';
import { colorLightBege, spaceXXL } from './design-system';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${colorLightBege};
	height: 100vh;
	max-height: calc(100vh - 40px);
	width: 100vw;
	font-size: ${spaceXXL};
	color: white;
	overflow: hidden;
	padding: 20px;
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

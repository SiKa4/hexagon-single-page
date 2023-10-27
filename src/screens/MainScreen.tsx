import styled from "styled-components";
import {Header} from "../components/header/Header.tsx";
import {HexagonsAndQuadrilaterals} from "../components/hexagon/HexagonsAndQuadrilaterals.tsx";

export const MainScreen = () => {
    return (
        <Wrapper>
            <Header/>
            <HexagonsAndQuadrilaterals/>
        </Wrapper>
    );
}

MainScreen.displayName = 'MainScreen';

const Wrapper = styled.div.attrs({className: 'main-wrapper'})`
  display: flex;
  overflow: hidden;
`;

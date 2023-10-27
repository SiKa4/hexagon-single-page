import styled from "styled-components";

export const Header = () => {
    return (
        <Wrapper>

        </Wrapper>
    );
}

Header.displayName = 'Header';

const Wrapper = styled.div.attrs({ className: 'header-wrapper' })`
  display: flex;
`;

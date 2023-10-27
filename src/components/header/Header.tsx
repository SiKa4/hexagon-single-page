import styled from "styled-components";
import {strings} from "../../assets/strings/strings.ts";
import {exitIcon, hamburgerMenu} from "../../assets/img.ts";

export const Header = () => {

    return (
        <Wrapper>
            <SpanText>{strings.ticketsAndSeasonTickets}</SpanText>
            <BlockCenterSpan>
                <SpanText>{strings.howToBuy}</SpanText>
                <SpanText>{strings.rules}</SpanText>
                <SpanText>{strings.ticketRefund}</SpanText>
            </BlockCenterSpan>
            <BlockRightSpanAndIcon>
                <SpanText>
                    <Icon src={exitIcon} isInvert={true}/>
                    {strings.enter}
                </SpanText>
                <Icon src={hamburgerMenu}/>
            </BlockRightSpanAndIcon>
        </Wrapper>
    );
}

Header.displayName = 'Header'


const Icon = styled.img<{ isInvert?: boolean }>`
  filter: invert(${props => props.isInvert == true ? 1 : 0});
  transition: filter 0.3s ease-in-out;
  width: 40px;
  height: 40px;
  margin-right: ${props => props.isInvert == true ? 0.5 : 0}vw;
  margin-left: ${props => props.isInvert == true ? 0 : 3}vw;
  cursor: pointer;

  &:hover {
    filter: invert(0.2);
  }
`;

const SpanText = styled.span.attrs({className: 'span-text'})`
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: calc(100% + 10px);
    transition: width 0.3s ease-in-out;
    left: 50%;
    width: 0;
    height: 3px;
    background-color: white;
    transform: translate(-50%, -50%);
  }
  
  &:hover{
    color: var(--dark-white);
    & ${Icon} {
      filter: invert(0.8);
    }
    &::before {
      width: 100%;

    }
  }
`;

const Wrapper = styled.div.attrs({className: 'header-wrapper'})`
  display: flex;
  position: absolute;
  width: 94vw;
  padding: 4vh 3vw 2vw;
  align-items: center;
  z-index: 20;
`;

const BlockCenterSpan = styled.div.attrs({className: 'block-center-span'})`
  display: flex;
  gap: 3vw;
  margin-left: auto;
  align-items: center;
`;

const BlockRightSpanAndIcon = styled.div.attrs({className: 'block-right-span-and-icon'})`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

import styled, {css} from "styled-components";
import React, {useEffect, useState} from "react";

export const HexagonsAndQuadrilaterals = () => {
    const [index, setIndex] = useState(2);
    const [marginQuadrilateral, setMarginQuadrilateral] = useState({left: 0, right: 0})

    const arrayContents = [
        {
            opponent1: "Соперник №1",
            opponent2: "Соперник №2",
            stadium: "Стадион",
            numDate: "30",
            month: "СЕНТЯБРЯ",
            time: "19:20"
        },
        {
            opponent1: "Соперник №3",
            opponent2: "Соперник №4",
            stadium: "Стадион",
            numDate: "16",
            month: "ИЮЛЯ",
            time: "19:20"
        },
        {
            opponent1: "Соперник №5",
            opponent2: "Соперник №6",
            stadium: "Стадион",
            numDate: "26",
            month: "ИЮНЯ",
            time: "19:20"
        },
        {
            opponent1: "Соперник №6",
            opponent2: "Соперник №7",
            stadium: "Стадион",
            numDate: "17",
            month: "ИЮНЯ",
            time: "19:20"
        },
        {
            opponent1: "Соперник №8",
            opponent2: "Соперник №9",
            stadium: "Стадион",
            numDate: "30",
            month: "МАЯ",
            time: "19:20"
        },
    ];

    const arrayPadding = [
        {top: 54, bottom: 0},
        {top: 26, bottom: 0},
        {top: 0, bottom: 0},
        {top: 0, bottom: 26},
        {top: 0, bottom: 54},
    ];

    const handleScroll = (e: React.WheelEvent) => {
        const isScrollingDown = e.deltaY > 0;

        if (isScrollingDown && index < arrayContents.length - 1) {
            setIndex(index + 1);
        } else if (!isScrollingDown && index > 0) {
            setIndex(index - 1);
        }
    };

    useEffect(() => {
        setMarginQuadrilateral({left: -10, right: -10})
        setTimeout(() => {
            setMarginQuadrilateral({left: 0, right: 0})
        }, 500);
    }, [index]);


    return (
        <div onWheel={handleScroll}>
            <WrapperContainerTwo>
                <Quadrilateral margin={marginQuadrilateral}>
                    <ContentQuadrilateral>{arrayContents[index].opponent1}</ContentQuadrilateral>
                </Quadrilateral>
                <Quadrilateral isTwo={true} margin={marginQuadrilateral}>
                    <ContentContentQuadrilateralRotate>{arrayContents[index].opponent2}</ContentContentQuadrilateralRotate>
                </Quadrilateral>
            </WrapperContainerTwo>

            <WrapperContainer>
                <Container position={index} padding={arrayPadding[index]}>
                    {
                        arrayContents.map((value, i) => (
                            <Hexagon isSelected={index == i}
                                     isLast={Math.abs(i - index) >= 2} onClick={() => setIndex(i)}>
                                <ContentHexagon isSelected={index == i}>
                                    {
                                        index == i &&
                                        <>
                                            <SpanOne>{value.stadium}</SpanOne>
                                            <SpanTwo>{value.numDate} {value.month}</SpanTwo>
                                            <SpanOne>{value.time}</SpanOne>
                                            <ButtonBuyTickets> <SpanOne>Купить билет</SpanOne></ButtonBuyTickets>
                                        </>
                                    }
                                    {index != i &&
                                        <>
                                            <SpanThree>{value.numDate}</SpanThree>
                                            <SpanThree>{value.month}</SpanThree>
                                        </>
                                   }
                                </ContentHexagon>
                            </Hexagon>
                        ))
                    }
                </Container>
            </WrapperContainer>
        </div>

    )
}

HexagonsAndQuadrilaterals.displayName = 'HexagonsAndQuadrilaterals';

const ContentQuadrilateral = styled.span.attrs({className: 'content-quadrilateral'})`
  position: absolute;
  font-size: 3.5vw;
  font-weight: 500;
  color: black;
  margin-top: 4vw;
  line-height: 1vw;
`;

const ContentContentQuadrilateralRotate = styled(ContentQuadrilateral)`
  transform: rotate(180deg);
`;

const Quadrilateral = styled.div.attrs({className: 'quadrilateral'})<{
    isTwo?: boolean,
    margin: { left: number, right: number }
}>`
  margin-top: -2vw;
  width: 45vw;
  height: 18vw;
  background-color: white;
  clip-path: polygon(0% 0%, 100% 0%, 88% 50%, 0% 50%);
  transition: margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  

  ${({isTwo, margin}) => !isTwo && margin && css`
    margin-right: auto;
    margin-left: ${margin.left}vw;
  `}

  ${({isTwo, margin}) => isTwo && margin && css`
    transform: rotate(180deg);
    margin-top: -0.6vw;
    width: 42.5vw;
    margin-left: auto;
    margin-right: ${margin.right}vw;
  `}
`;

const ContentHexagon = styled.div.attrs({className: 'content-hexagon'})<{isSelected: boolean}>`
  transform: rotate(-60deg);
  width: 69%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2vw;
  padding-top: 2vw;
  
  ${({isSelected}) => !isSelected && css`
    padding-top: 4.2vw;
    gap: 1vw;
  `}
`;


const Hexagon = styled.div.attrs({className: 'hexagon'})<{ isSelected: boolean, isLast: boolean }>`
  width: 14vw;
  height: 12.4vw;
  background-color: white;
  clip-path: polygon(50% 0%, 75% 0%, 100% 50%, 75% 100%, 50% 100%, 25% 100%, 0% 50%, 25% 0%);
  margin-bottom: 3vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  justify-content: center;
  align-items: center;

  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;


  ${({isSelected}) => isSelected && css`
    width: 20vw;
    height: 17.8vw;
  `};

  ${({isLast}) => isLast && css`
    width: 11vw;
    height: 10vw;

    ${ContentHexagon} {
      padding-top: 3.3vw;
    }
  `}
`;

const Container = styled.div.attrs({className: 'container'})<{
    position: number,
    padding: { top: number, bottom: number }
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  transform: rotate(60deg);
  overflow: hidden;
  transition: padding-bottom 0.3s ease-in-out, padding-top 0.3s ease-in-out;

  ${Hexagon}:last-child {
    padding-bottom: 0;
  }

  padding-bottom: ${props => props.padding.bottom}vw;
  padding-top: ${props => props.padding.top}vw;
`;

const WrapperContainerTwo = styled.div.attrs({className: 'wrapper-container-two'})`
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WrapperContainer = styled.div.attrs({className: 'wrapper-container'})`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ButtonBuyTickets = styled.div.attrs({className: "button-buy-tickets"})`
  width: 80%;
  height: 20%;
  border: black 1px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  
  &:hover{
    background-color: var(--translucent-dark);
  }
`;

const Span = styled.p`
  color: black;
  padding: 0;
  margin: 0;
  text-align: center;
  line-height: 1vw;
  white-space: nowrap;
`;

const SpanOne = styled(Span).attrs({className: 'span-one'})`
  font-size: 1.4vw;
`;

const SpanTwo = styled(Span).attrs({className: 'span-two'})`
  font-size: 2vw;
  font-weight: 500;
`;

const SpanThree = styled(Span).attrs({className: 'span-three'})`
  font-size: 1.5vw;
  font-weight: 500;
`;
import styled, {css} from "styled-components";
import React, {useEffect, useState} from "react";

export const HexagonsAndQuadrilaterals = () => {
    const [index, setIndex] = useState(2);
    const [marginQuadrilateral, setMarginQuadrilateral] = useState({left: 0, right: 0})

    const arrayContents = [1, 2, 3, 4, 5];

    const arrayPadding = [
        {top: 39, bottom: 0},
        {top: 18, bottom: 0},
        {top: 0, bottom: 0},
        {top: 0, bottom: 18},
        {top: 0, bottom: 39},
    ];

    const handleScroll = (e : React.WheelEvent) => {
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
            <WrapperContainer2>
                <Quadrilateral margin={marginQuadrilateral}/>
                <Quadrilateral isTwo={true} margin={marginQuadrilateral}/>
            </WrapperContainer2>

            <WrapperContainer>
                <Container position={index} padding={arrayPadding[index]}>
                    {
                        arrayContents.map((value, i) => (
                            <Hexagon isSelected={index == i}
                                     isLast={Math.abs(i - index) >= 2}>
                                <Span>{value}</Span>
                            </Hexagon>
                        ))
                    }
                </Container>
            </WrapperContainer>
        </div>

    )
}

HexagonsAndQuadrilaterals.displayName = 'HexagonsAndQuadrilaterals';

const Quadrilateral = styled.div<{ isTwo?: boolean, margin: { left: number, right: number } }>`
  margin-top: -2vw;
  width: 45vw;
  height: 13vw;
  background-color: white;
  clip-path: polygon(0% 0%, 100% 0%, 91% 50%, 0% 50%);
  transition: margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out;

  ${({isTwo, margin}) => !isTwo && margin && css`
    margin-right: auto;
    margin-left: ${margin.left}vw;
  `}

  ${({isTwo, margin}) => isTwo && margin && css`
    transform: rotate(180deg);
    margin-top: -0.6vw;
    width: 42.5vw;
    margin-left: auto;
    margin-right: ${margin.right}vw;;
  `}
`;

const Hexagon = styled.div<{ isSelected: boolean, isLast: boolean }>`
  width: 10vw;
  height: 8.9vw;
  background-color: white;
  clip-path: polygon(50% 0%, 75% 0%, 100% 50%, 75% 100%, 50% 100%, 25% 100%, 0% 50%, 25% 0%);
  margin-bottom: 3vw;
  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  align-content: center;

  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;


  ${({isSelected}) => isSelected && css`
    width: 16vw;
    height: 14.5vw;
  `};

  ${({isLast}) => isLast && css`
    width: 7vw;
    height: 6vw;
  `}
`;

const Container = styled.div<{ position: number, padding: { top: number, bottom: number } }>`
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

const WrapperContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WrapperContainer2 = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Span = styled.span`
  transform: rotate(-60deg);
  position: absolute;
  color: black;
  font-size: 1vw;
`;
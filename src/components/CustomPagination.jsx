import React from 'react';
import styled from 'styled-components';

const DOTS = ".....";

const CustomPagination = ({ containerStyle, currentPage, pageLimit, pageRange, goToPreviousPage, goToNextPage, changePage}) => {
  if(currentPage <= 0 || pageLimit <= 1) {
    return null;
  }
  
  const getPaginationGroup = () => {
    const range = pageRange < pageLimit ? pageRange : pageLimit;
    const start = Math.floor((currentPage - 1) / range) * range;
    const end = start + range;

    let group = new Array(range).fill()
                                .map((_, idx) => start + idx + 1)
                                .filter((value) => value > 0 && value <= pageLimit );

    if(start > 0) {
      // If group does not include starting page, add 
      group = [1, DOTS].concat(group);
    }
    if(end < pageLimit) {
      // If group does not include the last page, add 
      group = group.concat([DOTS, pageLimit]);
    }

    return group;
  };

  const renderItem = (item, index) => {
    if(item === DOTS) {
      return <Dots key={index}>{item}</Dots>
    } else {
      return ( 
        <MiddleButton key={index} active={currentPage === item} onClick={(event) => changePage( Number(event.target.textContent))}>
          {item}
        </MiddleButton>
      );
    }
  }

  return (
    <Container style={containerStyle}>
      <Button disabled={currentPage === 1} onClick={goToPreviousPage}>
        prev
      </Button>

      {/* show page numbers */}
      {getPaginationGroup().map(renderItem)}

      {/* next button */}
      <Button disabled={currentPage === pageLimit} onClick={goToNextPage}>
        next
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Button = styled.button`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 10px;
  color: #689FF0;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.4);
  margin: 0 10px;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    background-color: #689FF0;
    color: #ffffff;
    transition-duration: .5s;
    transform: scale(1.2);
  }
  ${({ disabled }) => disabled && `
    pointer-events: none;
    box-shadow: none;
    color: #999;
  `}
`

const MiddleButton = styled.button`
  align-items: center;
  justify-content: center;
  color: #689FF0;
  background-color: #ffffff;
  border: 2px dashed #666666;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  position: relative;
  margin: 0 5px;
  cursor: pointer;
  font-weight: 900;
  &:hover {
    background-color: #689FF0;
    color: #ffffff;
    transition-duration: .5s;
    transform: scale(1.2);
  }
  ${({ active }) => active && `
    border: 3px solid #000;
    background-color: #689FF0;
    color: #ffffff;
    pointer-events: none;
  `}
`
const Dots = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 1);
  height: 45px;
  width: 45px;
  margin: auto 4px;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 3px;

  &:hover {
    background-color: transparent;
    cursor: default;
  }
`

export default React.memo(CustomPagination);
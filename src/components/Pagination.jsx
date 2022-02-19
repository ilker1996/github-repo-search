import React, { useCallback } from 'react';
import styled from 'styled-components';

const Pagination = ({ containerStyle, currentPage, pageLimit, pageRange, goToPreviousPage, goToNextPage, changePage}) => {
  const getPaginationGroup = useCallback(() => {
    const start = Math.floor((currentPage - 1) / pageRange) * pageRange;
    return new Array(pageRange).fill().map((_, idx) => start + idx + 1);
  }, [currentPage, pageRange]);

  return (
    <Container style={containerStyle}>
      <Button disabled={currentPage === 1} onClick={goToPreviousPage}>
        prev
      </Button>

      {/* show page numbers */}
      {getPaginationGroup().map((item, index) => (
        <MiddleButton
          key={index}
          active={currentPage === item}
          onClick={(event) => {
            const number = Number(event.target.textContent);
            changePage(number);
          }}
        >
          <Span>{item}</Span>
        </MiddleButton>
      ))}

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
  background: #fff;
  border: none;
  padding: 10px;
  color: blue;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  margin: 0 10px;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    pointer-events: none;
    box-shadow: none;
    color: #999;
  `}
`
const MiddleButton = styled.button`
  background: #ffffff;
  border: 2px solid #666;
  padding: 10px 15px;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  position: relative;
  margin: 0 5px;
  cursor: pointer;
  ${({ active }) => active && `
    border: 1px solid #888;
    color: #888;
    pointer-events: none;
  `}
`
const Span = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default React.memo(Pagination);
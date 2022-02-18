import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

const SearchBox = ({ placeholder, buttonText, onSubmit }) => {
  const inputRef = useRef();
  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Container>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <Button onClick={() => onSubmit(query)}>
        {buttonText}
      </Button>
    </Container>
  )
};

const Container = styled.div`
  align-self: center;
  margin-bottom: 5%;
`
const Input = styled.input`
  padding: 10px 20px;
  border: solid 2px #686868;
  border-radius: 5px;
  margin-right: 5px;
  outline: none;
  &:focus {
    border-color: #005ad8;
    transition: 0.5s;
  }
`
const Button = styled.button`
  padding: 10px 20px;
  border: solid 2px #005ad8;
  border-radius: 5px;
  background-color: #005ad8;
  color: white;
  outline: none;
  cursor: pointer;
`

export default SearchBox;
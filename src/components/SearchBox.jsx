import React, { useState } from 'react';

import styled from 'styled-components';

const SearchBox = ({ placeholder, buttonText, onSubmit }) => {
  const [text, setText] = useState('');

  return (
    <Container>
      <Input 
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <Button onClick={() => onSubmit(text)}>
        {buttonText}
      </Button>
    </Container>
  )
};

const Container = styled.div`
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
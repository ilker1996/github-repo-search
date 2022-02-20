import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Audio } from  'react-loader-spinner'

/**
 * Component for typing the search query in the input box 
 *        and submitting it
 * @component
 * @example
 * return (
 *   <SearchBox
 *     loading={true}
 *     containerStyle={{backgroundColor: black}}
 *     placeholder="Search Repository"
 *     buttonText="Search"
 *     onSubmit={(name) => {
 *        Do some operations with submitted query
 *       }
 *     }
 *   />
 * );
 */
const SearchBox = ({ loading, placeholder, buttonText, onSubmit, containerStyle }) => {
  const inputRef = useRef();
  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Container style={containerStyle}>
      <Span>
        {loading ? 
          <Audio height="25" width="25" color='#689FF0'/> 
          : <div style={{ width: 25, height: 25 }}  /> // Placeholder
        }
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Span>
      <Button onClick={() => {
        if(query) {
          onSubmit(query);
        }
      }}>
        {buttonText}
      </Button>
    </Container>
  )
};

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 80%;
`
const Span = styled.span`
  background-color: white;
  flex: 1;
  display: flex;
  flex-direction: row;
  border: solid 3px #689FF0;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
`
const Input = styled.input`
  border:none;
  outline: none;
  color: rgba(0, 0, 0, 1);
  font-family: Verdana, American Typewriter, serif;
  font-size: 22px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-left: 10px;
  width: 100%;
`
const Button = styled.button`
  background-color: #689FF0;
  border-radius: 5px;
  padding: 10px 20px;
  color: #FFFEFD;
  font-family: Verdana, American Typewriter, serif;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
`

export default SearchBox;
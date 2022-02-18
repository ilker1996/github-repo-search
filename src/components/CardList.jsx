import React from 'react'
import styled from 'styled-components';

import Card from './Card';

const CardList = ({ items }) => {
  if(!items || items.length <= 0 ) {
    return null;
  }

  return (
    <Container>
      {items.map((item) =>
        <Card
          key={item.id}
          item={item}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default CardList;
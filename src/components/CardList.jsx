import React from 'react';
import styled from 'styled-components';

import Card from './Card';

/**
 * Component for listing the Card component
 * @component
 * @example
 * const items = [
 *  {
 *   name : "github-search",
 *   description: "Search GitHub repositories",
 *   language: "Javascript",
 *   html_url: "https://github.com/ilker1996/github-search",
 *   updated_at: "2022-02-20T06:16:09Z",
 *   owner: {
 *     login: "ilker1996",
 *     avatar_url: "https://avatars.githubusercontent.com/u/84990219?v=4",
 *   },
 *  {
 *   name : "github-search",
 *   description: "Search GitHub repositories",
 *   language: "Javascript",
 *   html_url: "https://github.com/ilker1996/github-search",
 *   updated_at: "2022-02-20T06:16:09Z",
 *   owner: {
 *     login: "ilker1996",
 *     avatar_url: "https://avatars.githubusercontent.com/u/84990219?v=4",
 *   },
 *  }
 * ]
 * return (
 *   <CardList items={items} />
 * );
 */
const CardList = ({ items }) => {
  if(!items) {
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
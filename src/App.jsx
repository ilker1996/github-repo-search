import styled from 'styled-components';

import axios from 'axios';
import SearchBox from  './components/SearchBox';
import CardList from './components/CardList';
import { useEffect, useState } from 'react';

const App = () => {
  const [items, setItems] = useState();

  const fetchRepos = () => {
    console.log("fetched")
    axios
    .get('repository.json')
    .then(res => {
      const items = res.data.items;
      setItems(items);
    })
    .catch(console.err)
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <Container>
      <SearchBox placeholder="Search Repository" buttonText="Search" onSubmit={() => console.log("Clicked!")} />
      <CardList items={items}  />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5%;
`

export default App;

 /* https://api.github.com/search/repositories?q=i+in%3Aname+user%3Ai2ii */

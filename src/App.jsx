import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import SearchBox from  './components/SearchBox';
import CardList from './components/CardList';

const ITEM_PER_PAGE = 50;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRepositories = () => {
      const endpoint = `https://api.github.com/search/repositories`;

      setLoading(true);
      axios.get(`${endpoint}?q=${name} in:name&page=${currentPage}&per_page=${ITEM_PER_PAGE}`)
      .then(res => {
        const { total_count, items } = res.data;
        setPageCount(Math.ceil(total_count / items.length));
        setItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.err(err);
        setError(true);
        setLoading(false);
      })
    }

    if(name && currentPage) {
      fetchRepositories();
    }
  }, [name, currentPage]);
  
  return (
    <Container>
      <SearchBox placeholder="Search Repository" buttonText="Search" onSubmit={setName} />
      {!loading && items && items.length > 0 &&
        <>
          <CardList items={items} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null} />
        </>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5%;
`

export default App;
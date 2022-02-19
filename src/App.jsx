import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Pagination from './components/Pagination';
import SearchBox from  './components/SearchBox';
import CardList from './components/CardList';

const ITEM_PER_PAGE = 30;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRepositories = () => {
      setLoading(true);
      const endpoint = `https://api.github.com/search/repositories`;
      axios.get(`${endpoint}?q=${repoName} in:name&page=${currentPage}&per_page=${ITEM_PER_PAGE}`)
      .then(res => {
        const { total_count, items } = res.data;
        setPageLimit(Math.ceil(total_count / ITEM_PER_PAGE));
        setItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.err(err);
        setError(true);
        setLoading(false);
      })
    }

    if(repoName && currentPage) {
      fetchRepositories();
    }
  }, [repoName, currentPage]);
  

  const goToNextPage = useCallback(() => {
    if(currentPage < pageLimit) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pageLimit]);

  const goToPreviousPage = useCallback(() => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage]);

  const changePage = useCallback((number) => {
    console.log(number);
    console.log(pageLimit);
    if(number > 0 && number <= pageLimit) {
      setCurrentPage(number);
    }
  }, [pageLimit]);

  if(error) {
    return <h1>Something went wrong! Try again</h1>
  }

  return (
    <Container>
      <SearchBox 
        containerStyle={styles.searchbox}
        placeholder="Search Repository"
        buttonText="Search"
        onSubmit={setRepoName}
      />
      {!loading && items && items.length > 0 &&
        <>
          <CardList items={items}/>
          <Pagination
            containerStyle={styles.pagination}
            currentPage={currentPage}
            pageRange={5}
            pageLimit={pageLimit}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            changePage={changePage}
          />
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

const styles = {
  searchbox: {
    marginBottom: '5%',
  },
  pagination: {
    marginTop: '5%',
    marginBottom: '5%',
  }
}

export default App;
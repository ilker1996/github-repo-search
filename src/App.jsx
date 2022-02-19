import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Pagination from './components/Pagination';
import SearchBox from  './components/SearchBox';
import CardList from './components/CardList';
import { fetchRepositories } from './service/api';

const ITEM_PER_PAGE = 30;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchRepositories(repoName, currentPage, ITEM_PER_PAGE);
        console.log(response);
        if(response.status === 200) {
          const { total_count, items } = response.data;
          setPageLimit(Math.ceil(total_count / ITEM_PER_PAGE));
          setItems(items);
          setMessage(`${items.length} results found`);
          setLoading(false);
          console.log(!loading && !error);
          console.log(items && items.length > 0);
        }
      } catch (error) {
        console.log(error.message);
        setError('Something went wrong! Try again');
        setLoading(false);
      }
    };

    if(repoName && currentPage) {
      fetch();
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
    if(number > 0 && number <= pageLimit) {
      setCurrentPage(number);
    }
  }, [pageLimit]);

  return (
    <Container>
      <SearchBox
        loading={loading}
        containerStyle={styles.searchbox}
        placeholder="Search Repository"
        buttonText="Search"
        onSubmit={setRepoName}
      />
      {error && <Error>{error}</Error>}
      {!loading && !error && message && <Message>{message}</Message>}
      {!loading && !error && items && items.length > 0 &&
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
  padding: 5%;
`
const Error = styled.h1`
  align-self: center;
  text-align: center;
  font-family: Verdana, sans-serif;
  font-size: 25px;
  letter-spacing: 2px;
`
const Message = styled.p`
  align-self: center;
  text-align: center;
  color: rgba(0, 0, 0, .8);
  font-family: Verdana, sans-serif;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 20px;
`
const styles = {
  searchbox: {
    marginBottom: '10px',
  },
  pagination: {
    marginTop: '30px',
    marginBottom: '30px',
  }
}

export default App;
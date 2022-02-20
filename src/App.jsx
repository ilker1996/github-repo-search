import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import CustomPagination from './components/CustomPagination';
import SearchBox from  './components/SearchBox';
import CardList from './components/CardList';
import { fetchRepositories } from './service/api';

const ITEM_PER_PAGE = 30; // Number of items to show on each page
const ITEM_LIMIT = 1000; // The limit defined by the GitHub API

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [items, setItems] = useState([]);

  const scrollToTop = () => window.scrollTo({top: 0});

  useEffect(() => {
    const fetch = () => {
        setLoading(true);
        fetchRepositories(repoName, currentPage, ITEM_PER_PAGE)
        .then((response) => {
          if(response.status === 200) {
            const { total_count, items } = response.data;
  
            const pageCount = Math.ceil(total_count / ITEM_PER_PAGE); // Page count in total
            const pageLimit = Math.ceil(ITEM_LIMIT / ITEM_PER_PAGE); // the page limit for the API
            setPageLimit(Math.min(pageCount, pageLimit));
  
            setItems(items);
            setMessage(`${total_count} results found`);
            setLoading(false);
            
          } else {
            console.log(`Response status ${response.status}`);
            setError('Something went wrong! Try again');
            setLoading(false);
          }
          scrollToTop();
        })
        .catch((error) => {
          console.log(error.message);
          setError('Something went wrong! Try again');
          setLoading(false);
          scrollToTop();
        });
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
      setCurrentPage(currentPage - 1);
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
        onSubmit={(name) => {
            // Reset page number
            setCurrentPage(1);
            // Set searched repository name
            setRepoName(name);
          }
        }
      />
      {error && <Error>{error}</Error>}
      {!loading && !error && message && <Message>{message}</Message>}
      {!loading && !error && items && items.length > 0 &&
        <>
          <CardList items={items}/>
          <CustomPagination
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
  background-color: #F4E8D2;
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
import React from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import { getAISuggestPerPage, getTicToktPerPage, getTodayDealsPerPage } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { Container, FlexboxGrid, Pagination } from 'rsuite';
import { MoreItemsResponse, Product } from 'utils/types';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';

const SeeMore: React.FC = () => {
  const location = useLocation();
  const currPath = location.pathname;
  const [activePage, setActivePage] = React.useState(1);

  const {
    data: { tiktok_mongo: tikProducts = [], today_deals_mongo: dealsProducts = [], top_50_stores: aiProducts = [], total_documents: pages = 1 } = {},
    isLoading,
    isError,
  } = useQuery<MoreItemsResponse, Error>(['products', activePage], () => {
    console.log(currPath);

    if (currPath === "/more-ai") {
      return getAISuggestPerPage(activePage)
    } else if (currPath === "/more-deals") {
      return getTodayDealsPerPage(activePage)
    } else {
      return getTicToktPerPage(activePage)
    }
  }
  );

  const handlePageChange = (page: number) => {
    setActivePage(page)
  };

  const loadProducts = () => {
    const prods = [...tikProducts, ...dealsProducts, ...aiProducts]
    if (prods.length > 0) {
      return prods.map((item: Product) => {
        return <Card key={item.id} product={item} />;
      });
    }
    return <div>No items found</div>
  };

  return (
    <>
      <Header className="search-header" />
      <Container className="search-content">

        <Flex style={{ justifyContent: 'space-between', gap: '14px' }}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching products</div>
          ) : (
            <FlexboxGrid className="search-flex">
              {loadProducts()}
            </FlexboxGrid>
          )}

        </Flex>
        <Pagination
          prev
          last
          next
          first
          total={pages || 0}
          ellipsis
          size="md"
          boundaryLinks
          maxButtons={3}
          limit={30}
          activePage={activePage}
          className='paginator'
          onChangePage={handlePageChange}
        />
      </Container>
    </>
  );
};

export default SeeMore;
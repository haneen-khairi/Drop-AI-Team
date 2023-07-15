import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import FilterSearch from '../components/FilterSearch';
import { FilterData, FilterSearchResponse, Product } from 'utils/types';
import { fetchProducts } from '../utils/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Container, FlexboxGrid, Pagination } from 'rsuite';
import Card from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import FacebookInterest from '../components/FacebookInerest';

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.filterData) {
      navigate('/', { replace: true });
    }
  }, [])

  const [filter, setFilter] = useState<FilterData>(location.state?.filterData);
  const [activePage, setActivePage] = React.useState(location.state?.filterData.page | 1);
  const queryClient = useQueryClient();

  const {
    data: { data: products = [], total_documents: items = 0 } = {},
    isLoading,
    isError,
  } = useQuery<FilterSearchResponse, Error>(['products', filter], () =>
    fetchProducts(filter)
  );

  const invalidateQ = async () => {
    // await queryClient.invalidateQueries({ queryKey: ['products', filter] });
    await queryClient.invalidateQueries({
      predicate: (query) => {
        return query.queryKey[0] === 'products'
      }
    })
  };

  const handlePageChange = (page: number) => {
    setActivePage(page)
    setFilter({ ...filter, page: page });
  };

  const handleFilterChange = (filterData: FilterData) => {
    setFilter(filterData);
    setActivePage(1)
    navigate('/search', { state: { filterData }, replace: true });
  };

  const loadProducts = (prods: Product[]) => {
    return prods.map((item: Product) => {
      return <Card key={item.id} product={item} invalidateQ={invalidateQ} />;
    });
  };

  return (
    <>
      <Header className="search-header" />
      <Container className="search-content">
        <FilterSearch
          onFilterChange={handleFilterChange}
          currentFilter={filter}
        />

        {/* <div className='search-statistics'>
            <div className='search'></div>
            <div className='number'></div>
        </div> */}

        <Flex style={{ justifyContent: 'space-between', gap: '14px' }}>
          <p>
            Total results: {items}
          </p>
        </Flex>

        <Flex style={{ justifyContent: 'space-between', gap: '14px' }}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching products</div>
          ) : products && products.length > 0 ? (
            <FlexboxGrid className="search-grid">
              {loadProducts(products)}
            </FlexboxGrid>
          ) : (
            <div>No items found</div>
          )}

          <FacebookInterest filter={filter} />
        </Flex>
        <Pagination
          prev
          last
          next
          first
          total={items || 0}
          ellipsis
          size="md"
          boundaryLinks
          maxButtons={3}
          limit={9}
          activePage={activePage}
          className='paginator'
          onChangePage={handlePageChange}
        />
      </Container>
    </>
  );
};

export default Search;

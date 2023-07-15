import React from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import { Product } from 'utils/types';
import { getFavourite } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { Container, FlexboxGrid } from 'rsuite';
import Card from '../components/Card';

const WishList: React.FC = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Product[], Error>(['wishlist',], () =>
    getFavourite()
  );

  const loadProducts = (prods: Product[]) => {
    return prods.map((item: Product) => {
      return <Card key={item.id} product={{ ...item, user_data: [{ fav_added: true }] }} />;
    });
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
          ) : data && data?.length > 0 ? (
            <FlexboxGrid className="search-flex">
              {loadProducts(data)}
            </FlexboxGrid>
          ) : (
            <div>No items found</div>
          )}

        </Flex>
      </Container>
    </>
  );
};

export default WishList;

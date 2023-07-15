import React from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import FilterSearch from '../components/FilterSearch';
import { FilterData, Product } from 'utils/types';
import { fetchAISuggestions, fetchTodayDeals, fetchTikTok } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { Container } from 'rsuite';
import Collection from '../components/Collection';
import { useNavigate } from 'react-router-dom';
import ai from '../assets/img/ai.svg';
import deals from '../assets/img/deals.svg';
import tik from '../assets/img/tik.svg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: aiSuggestions,
    isLoading: aiLoading,
    isError: aiError,
  } = useQuery<Product[], Error>(['ai-suggestions'], fetchAISuggestions);
  const {
    data: todayDeals,
    isLoading: dealsLoading,
    isError: dealsError,
  } = useQuery<Product[], Error>(['today-deals'], fetchTodayDeals);
  const {
    data: tiktok,
    isLoading: tiktokLoading,
    isError: tiktokError,
  } = useQuery<Product[], Error>(['tiktok'], fetchTikTok);

  const handleFilterChange = (filterData: FilterData) => {
    navigate('/search', { state: { filterData } });
  };

  return (
    <>
      <Header className="home-header" />
      <Container className="home-content">
        <Flex
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: '40px',
          }}
        >
          <h1 className="headline">
            <span className="primary-color">Lorem ipsum </span>
            dolor sit amet consectetur dgfg consectetur
          </h1>

          <FilterSearch onFilterChange={handleFilterChange} />
        </Flex>
        <Collection
          records={aiSuggestions}
          isLoading={aiLoading}
          isError={aiError}
          collectionIcon={ai}
          collectionTitle="Al Suggestion"
          seeMorePath="more-ai"
        />
        <Collection
          records={todayDeals}
          isLoading={dealsLoading}
          isError={dealsError}
          collectionIcon={deals}
          collectionTitle={`Today's Deals`}
          seeMorePath="more-deals"
        />
        <Collection
          records={tiktok}
          isLoading={tiktokLoading}
          isError={tiktokError}
          collectionIcon={tik}
          collectionTitle={'Tictok'}
          seeMorePath="more-tictok"
        />
      </Container>
    </>
  );
};

export default Home;

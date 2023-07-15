import React from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import FilterSearch from '../components/FilterSearch';
import CustomFilter from '../components/CustomFilter';
import { FilterData, Product } from 'utils/types'; 
import { Container } from 'rsuite'; 
import { useNavigate } from 'react-router-dom'; 
import TableCnt from '../components/TableCnt';

const ShowCountry: React.FC = () => {
  const navigate = useNavigate();
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
          }}
        >
          <h1 className="headline">
            <span className="primary-color">Show Products Country</span>
          </h1>


        </Flex>
      </Container>
      <CustomFilter />
    </>
  );
};

export default ShowCountry;

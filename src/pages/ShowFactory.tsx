import React, { useEffect, useState } from 'react';
import { Container, Loader, Table, FlexboxGrid } from 'rsuite';
import robots from '../assets/img/robots.gif';
import axios from 'axios';
import Header from '../components/Header';
import Flex from '../components/Flex';
import { useLocation, useParams } from 'react-router-dom';

const baseApiURL = 'https://dropshipping-app-ingsl.ondigitalocean.app/';

const ShowFactory: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const productName = queryParams.get('productName');
    console.log(productName)
    handleFilter(productName)
  }, [location])
  
  const handleFilter = async (productName: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseApiURL}items/google_bard/?question=item_manufactory&item=${productName}`);
      setData(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
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
            <span className="primary-color">Show Factories</span>
          </h1>
        </Flex>
        <FlexboxGrid justify="center" align="middle" style={{ minHeight: '40vh' }}>
          <FlexboxGrid.Item>
            {isLoading ? (
              <>
                <Loader center content="Wait a second we are collecting your data" />
                <img src={robots} width={250} height={250} />
              </>
            ) : (
              <Table data={data} width={1300} height={400}>
                <Table.Column width={300}>
                  <Table.HeaderCell>Manufacturer</Table.HeaderCell>
                  <Table.Cell dataKey="manufacturer" />
                </Table.Column>
                <Table.Column width={300}>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.Cell dataKey="model" />
                </Table.Column>
                <Table.Column width={300}>
                  <Table.HeaderCell>Storage</Table.HeaderCell>
                  <Table.Cell dataKey="storage" />
                </Table.Column>
                <Table.Column width={200}>
                  <Table.HeaderCell>SKU</Table.HeaderCell>
                  <Table.Cell dataKey="sku" />
                </Table.Column>
                <Table.Column width={200}>
                  <Table.HeaderCell>Release Date</Table.HeaderCell>
                  <Table.Cell dataKey="release_date" />
                </Table.Column>
              </Table>
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </>
  );
};

export default ShowFactory;

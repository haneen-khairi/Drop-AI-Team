import React from 'react';
import Header from '../components/Header';
import Flex from '../components/Flex';
import { Container, Loader } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import robots from '../assets/img/robots.gif'
import { Form, Button, Table, Input, Stack, FlexboxGrid } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const baseApiURL = 'https://dropshipping-app-ingsl.ondigitalocean.app/';
const BestSeller: React.FC = () => {
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [website, setWebsite] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFilter = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${baseApiURL}items/google_bard/?question=platform_date_country&country=${country}&date=${date}&platform=${website}`
      );
      setData(response.data.products);
      setIsLoading(false)

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
            marginBottom: '20px',
          }}
        >
          <h1 className="headline">
            <span className="primary-color">Top 10 Products</span>
          </h1>

          <Form fluid>
            <Stack spacing={6} wrap justifyContent='center'>


              <Input value={country} onChange={(value: any) => setCountry(value)} className='limit-width-200' placeholder='Country' />
              <Input value={date} onChange={(value: any) => setDate(value)} className='limit-width-200' placeholder='Date' />
              <Input value={website} onChange={(value: any) => setWebsite(value)} className='limit-width-200' placeholder='Website' />

              <Button color="violet" appearance="primary" onClick={handleFilter}>
                Ask
              </Button>
            </Stack>
          </Form>
        </Flex>
        <FlexboxGrid justify="center" align="middle" style={{ minHeight: '40vh' }}>
          <FlexboxGrid.Item>
            {
              isLoading ?

                <><Loader center content="Wait a second we are collecting your data" />
                  <img src={robots} width={250} height={250} />
                </>
                :

                <Table data={data} width={1200} height={400}>
                  <Table.Column width={400} >
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell dataKey="name" />
                  </Table.Column>
                  <Table.Column width={200} >
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.Cell dataKey="price" />
                  </Table.Column>
                  <Table.Column width={600} >
                    <Table.HeaderCell>Product Link</Table.HeaderCell>
                    <Table.Cell dataKey="url">
                      {(rowData) => (
                        <Link to={`${rowData.url}`} target="_blank">{rowData.url}</Link>
                      )}
                    </Table.Cell>
                  </Table.Column>
                </Table>
            }

          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>

    </>
  );
};

export default BestSeller;

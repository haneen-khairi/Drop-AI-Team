import React, { useState } from 'react';
import { SocialSearchQ } from 'utils/types';
import { Input, InputGroup, Button, Stack, Form, RadioTileGroup, RadioTile, Panel, PanelGroup, Placeholder, Pagination, Grid, Row, Col } from 'rsuite';

import { Search, Funnel } from '@rsuite/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
interface FilterSearchProps {
    onFilterChange: (filter: SocialSearchQ) => void;
}
interface List {
    'name':string;
    'Page ID': string;
    'url': string;
}

const SocialSearchBox: React.FC<FilterSearchProps> = ({ onFilterChange }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('word');
    const [totalPages, setTotalPages] = useState(0)
    const [lists, setLists] = useState<List[]>([])
    const [pageMode, setPageMode] = useState(false)
    const handleInputChange = (value: string) => {
        setSearchValue(value);
    };

    const handleFilterClick = () => {
        const searchQ: SocialSearchQ = {
            searchValue,
            keyword
        };
        setSearchValue(searchQ.searchValue)
        if(searchQ.keyword === 'page'){
            onSearchPage(searchQ.searchValue, 1)
        }
        console.log('searchQ',searchQ)
        onFilterChange(searchQ);
    };
    function onPaginateResults(page:any){
        console.log('on paginate',page)
        setActivePage(page)
        onSearchPage(searchValue, page)
    }
    function onSearchPage(query:string, page: number | string){
        axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/core/page_search/?queryset=${query}&page=${page}`).then((data) => {
            console.log(data,'data of search')
            setLists(data.data.pages)
        const totalPages = data.data.total_pages;
        const actualTotalPages = Math.ceil(totalPages / 6)
            setTotalPages(actualTotalPages)
            setPageMode(true)
        }).catch((error) => {
            console.log('error in search ',error)
        })
    }
    const [activePage, setActivePage] = React.useState(1);
    return <>
        <Form onSubmit={handleFilterClick}>
            <Stack className='social-stack' direction='column' spacing={30} >
                <Stack.Item className='filter-txt-form' grow={1} alignSelf='stretch'>
                    <Stack spacing={6}>
                        <Stack.Item grow={1}>
                            <InputGroup className='filter-input'>
                                <InputGroup.Addon style={{ 'background': 'white' }}>
                                    <Search />
                                </InputGroup.Addon>
                                <Input value={searchValue} size="lg" placeholder='Search' onChange={handleInputChange} />
                            </InputGroup>
                        </Stack.Item>
                        <Button size="lg" type='submit' disabled={searchValue === ""} className='filter-btn' color='violet' appearance="primary" startIcon={<Funnel />}>
                            Search
                        </Button>
                    </Stack>
                </Stack.Item>

                <Stack spacing={6} wrap justifyContent='center'>
                    <RadioTileGroup onChange={(x) => setKeyword(String(x))} value={keyword} className='search-radio' inline aria-label="Create new project">
                        <RadioTile disabled>
                            coming soon
                        </RadioTile>
                        <RadioTile value='page'>
                            Page
                        </RadioTile>
                        <RadioTile value="word">
                            Word
                        </RadioTile>
                    </RadioTileGroup>
                </Stack>


            </Stack>
          
            <Grid>
            </Grid>

        </Form>
        <Row className="show-grid fix-margin">
            <Col lg={24} xl={24} xxl={24}>
            About 81,200 results 
                <div className='bg-greyf fix-margin'>
                    
                    {pageMode && <PanelGroup>
                        {lists.map((list, index) =><Link key={index} to={`/social-page/${list.name}`}> <Panel  header={list?.name}>
                            
                            
                        </Panel></Link>)} </PanelGroup>}
                    {totalPages > 1 && <Stack spacing={6} wrap justifyContent='center'>
                    <Pagination 
                        prev
                        last
                        next
                        first
                        size="xs"
                        total={totalPages}
                        activePage={activePage}
                        onChangePage={onPaginateResults}
                    />
                    </Stack>}
                </div>
            </Col>

        </Row>
    </>;
};

export default SocialSearchBox;

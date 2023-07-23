import React, { useState } from 'react';
import { SocialSearchQ } from 'utils/types';
import { Input, InputGroup, Button, Stack, Form, RadioTileGroup, RadioTile, Panel, PanelGroup, Placeholder, Pagination, Grid, Row, Col } from 'rsuite';

import { Search, Funnel } from '@rsuite/icons';
import axios from 'axios';
interface FilterSearchProps {
    onFilterChange: (filter: SocialSearchQ) => void;
}

const SocialSearchBox: React.FC<FilterSearchProps> = ({ onFilterChange }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('word');

    const handleInputChange = (value: string) => {
        setSearchValue(value);
    };

    const handleFilterClick = () => {
        const searchQ: SocialSearchQ = {
            searchValue,
            keyword
        };
        axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/facebook/page_details/PetSimple/`).then((data) => {
            console.log(data,' data of search')
        }).then((error) => {
            console.log('error in search',error)
        })
        console.log('searchQ',searchQ)
        // onFilterChange(searchQ);
    };

    const [activePage, setActivePage] = React.useState(5);
    return (
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
                <Row className="show-grid fix-margin">
                    <Col lg={24} xl={24} xxl={24}>
                    About 81,200 results 
                        <div className='bg-greyf fix-margin'>
                            
                            <PanelGroup>
                                <Panel header="Lorem ipsum dolor sit amet consectetu">
                                    <p>lorem umm accumsan lectus. Diam arcu id nec magna mauris commodo tellus molestiemm accumsan lectus. Diam arcu id nec</p>
                                </Panel>
                                <Panel header="Lorem ipsum dolor sit amet consectetu">
                                    <p>lorem umm accumsan lectus. Diam arcu id nec magna mauris commodo tellus molestiemm accumsan lectus. Diam arcu id nec</p>

                                </Panel>
                                <Panel header="Panel 3">
                                    <Placeholder.Paragraph />
                                </Panel>
                                <Panel header="Panel 4">
                                    <Placeholder.Paragraph />
                                </Panel>
                                <Panel header="Panel 5">
                                    <Placeholder.Paragraph />
                                </Panel>
                                <Panel header="Panel 6">
                                    <Placeholder.Paragraph />
                                </Panel>
                            </PanelGroup>
                            <Stack spacing={6} wrap justifyContent='center'>
                            <Pagination 
                                prev
                                last
                                next
                                first
                                size="xs"
                                total={100}
                                limit={10}
                                activePage={activePage}
                                onChangePage={setActivePage}
                            />
                            </Stack>
                        </div>
                    </Col>

                </Row>
            </Grid>

        </Form>
    );
};

export default SocialSearchBox;

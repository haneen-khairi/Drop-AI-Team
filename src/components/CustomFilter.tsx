import React from 'react';
import { Container, Navbar } from 'rsuite';
import { Table } from 'rsuite';
import { Link } from 'react-router-dom'; 

const { Column, HeaderCell, Cell } = Table;
const dataColumns = ['1', 'name', 'city', 'email'];
const data = dataColumns.map((column) => ({ column }));
const CustomFilter: React.FC<React.ComponentProps<typeof Navbar>> = () => {
    return (
        <div className='table-width'>
        <Container> 
                <Table
                    height={420}
                    data={data}
                    bordered
                    cellBordered
                    onSortColumn={(sortColumn, sortType) => {
                        console.log(sortColumn, sortType);
                    }}
                >
                    <Column width={50} align="center">
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>

                    <Column flexGrow={2}>
                        <HeaderCell>
                            Name <code>flexGrow={2}</code>
                        </HeaderCell>
                        <Cell dataKey="name" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>
                            City <code>flexGrow={1}</code>
                        </HeaderCell>
                        <Cell dataKey="city" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Email</HeaderCell>
                        <Cell dataKey="email" />
                    </Column>
                </Table> 
        </Container>
        </div>
    );
};

export default CustomFilter;
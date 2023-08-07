import React from 'react';
import { Modal, Table, List } from 'rsuite';
import { Post, Comment } from 'utils/types';

interface TableCntProp {
    data: Post[] | undefined;
    isLoading?: boolean;
}
const { Column, HeaderCell, Cell } = Table;

const TableCnt: React.FC<TableCntProp> = ({ data, isLoading } = { data: [], isLoading: false }) => {
    const [modalData, setModalData] = React.useState<Comment[]>([]);
    const handleClose = () => setModalData([]);

    return (
        <>
            <Modal overflow={true} open={modalData.length > 0} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <List bordered>
                        {modalData.length > 0 && modalData.map((comment, index) => (
                            <List.Item key={index}>
                                <p>{comment.Content}</p>
                                <p className='date'>Posted from: {comment.Date}</p>
                            </List.Item>
                        ))}
                    </List>
                </Modal.Body>
            </Modal>
            <Table
                loading={isLoading}
                bordered
                className='table'
                height={400}
                headerHeight={54}
                data={data}
                onRowClick={rowData => {
                    setModalData(rowData.Comments || [])
                    console.log('comments', rowData.Comments)
                }}
            >
                <Column verticalAlign="middle" flexGrow={2} minWidth={300}>
                    <HeaderCell>Post</HeaderCell>
                    <Cell dataKey="Post_Content" />
                </Column>
                <Column verticalAlign="middle" width={200} >
                    <HeaderCell>Page name</HeaderCell>
                    <Cell dataKey="page" />
                </Column>
                <Column verticalAlign="middle" width={200} >
                    <HeaderCell>Comments number</HeaderCell>
                    <Cell dataKey="Comments.length" />
                </Column>

            </Table>
        </>
    );
};

export default TableCnt;

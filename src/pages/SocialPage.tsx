import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Interest, NLPChart, Post } from 'utils/types';
import { Button, Container, Modal, Table  } from 'rsuite';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import FacebookInterestCard from '../components/FacebookInterestCard';
import { FiFileText } from '@react-icons/all-files/fi/FiFileText';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { FiFile } from '@react-icons/all-files/fi/FiFile';
import { FiDownload } from '@react-icons/all-files/fi/FiDownload';
import TableCnt from '../components/TableCnt';
import { getNLP, getPosts, wordStatistics } from 'utils/api';
import { useQuery } from '@tanstack/react-query';
import SideList from '../components/SideList';
import axios from 'axios';
// import downloadIcon from '../assets/img/download-01.svg';
const { Column, HeaderCell, Cell } = Table;
interface Details {
    
        pages: [],
        comments: [],
        mobile: string,
        website: string,
        Email: string
    
}
const SocialPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = useParams();

    const [name, setName] = useState('')
    const [details, setDetails] = useState<Details>()
    const [pages, setPages] = useState([])
    const [comments, setComments] = useState([])
    const [query,] = useState<string>(location.state?.socialSearchData?.searchValue || '');

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const { data: stats, isLoading: statsLoading } = useQuery<Interest, Error>(['Word-Interest', query], () => {
        return wordStatistics(query);
    },);

    // const { data: posts, isLoading: postsLoading } = useQuery<Post[], Error>(['Word-Posts', query], () => {
    //     return getPosts(query);
    // },);

    // const { data: nlpChart, isLoading: nlpLoading, refetch } = useQuery<NLPChart, Error>(['NLP-Chart', query], () => {
    //     return getNLP(query);
    // }, {
    //     enabled: false
    // });

    // const handleShow = () => {
    //     refetch();
    //     handleOpen();
    // }
    async function getDetails(name:string){
        await axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/facebook/page_details/?page_name=${name}`).then((data) => {
            console.log('data ==>',data.data)
            setDetails(data.data)
            setPages(data.data.pages)
            setComments(data.data.comments)
        }).catch((error) => {
            console.log('error in fetch' , error)
        })
    }
    useEffect(() => {
        if (params && params.name !== undefined) {
            const page_name: string = params.name;
            setName(page_name)
            console.log('name ==>',page_name)
            // Now you can safely use the 'name' variable which will be of type 'string'
            // Your code here...
            getDetails(page_name)
        } 
    
      
    }, [])
    
    return (
        <>
            <Header className="search-header" />
            <Container className="word-overview">
                <Row className='page-boundaries'>
                    <Col style={{ display: "flex", flexDirection: "column", minHeight: "500px" }}>
                        <h3 className='title'>
                          {name}
                        </h3>
                        <div className="p-4">
                            <p>Email: {details?.Email === '' ? 'No email found' : details?.Email}</p>
                            <br />
                            <p>Website: {details?.website === '' ? 'No website found' : details?.website}</p>
                            <br />
                            <p>Mobile: {details?.mobile === '' ? 'No website found' : details?.mobile}</p>
                        </div>
                        <Row className='statistics-row'>
                            <Row>
                                <p className='sub-title'>
                                    Page Information
                                </p>
                            </Row>
                            <Row>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(pages.length || 0)}
                                        text="User Number"
                                        Icon={FiUsers}
                                        color="#EDEDF7"
                                        detailList={[String(query), 'page']}
                                    />
                                </Col>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(comments.length || 0)}
                                        text="Comments Number"
                                        Icon={FiFileText}
                                        color="#F7EDED"
                                        detailList={[String(query), 'post']}
                                    />
                                </Col>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(stats?.users_number || 0)}
                                        text="Post Number"
                                        Icon={FiFile}
                                        color="#ECF3E5"
                                        detailList={[String(query), 'user']}
                                    />
                                </Col>

                            </Row>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        {/* <SideList keyword={String(query)} /> */}
                    </Col>
                </Row>

                <Row className='comments-row page-boundaries'>
                    <Row style={{ gap: '24px' }}>

                        <Col xs={"auto"} >
                            <p className='sub-title'>
                                Page Comments
                            </p>
                        </Col>
                        <Col>

                            <a
                                download={true}
                                href={`https://dropshipping-app-ingsl.ondigitalocean.app/facebook/download_csv_userID/${String(query)}/`}
                                className="download-btn go-btn rs-btn rs-btn-primary rs-btn-violet rs-btn-lg"
                            >
                                <FiDownload size={20} />
                                <p>
                                    Download CSV
                                </p>
                            </a>

                        </Col>

                    </Row>
                    <div className='table-row'>
                        {/* <TableCnt isLoading={postsLoading} data={(posts ? posts : [])} /> */}
                        <Table
                            // loading={isLoading}
                            bordered
                            className='table'
                            height={400}
                            headerHeight={54}
                            data={pages}
                            
                        >
                            <Column verticalAlign="middle" flexGrow={2} minWidth={300}>
                                <HeaderCell>Page content</HeaderCell>
                                <Cell dataKey="Post_Content" />
                            </Column>
                            <Column verticalAlign="middle" width={200} >
                                <HeaderCell>Page name</HeaderCell>
                                <Cell dataKey="page" />
                            </Column>
                            <Column verticalAlign="middle" width={200} >
                                <HeaderCell>name</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                            <Column verticalAlign="middle" width={200} >
                                <HeaderCell>Comments number</HeaderCell>
                                <Cell dataKey="Comments.length" />
                            </Column>

                        </Table>
                    </div>
                    

                </Row>
            </Container>
        </>
    );
};

export default SocialPage;

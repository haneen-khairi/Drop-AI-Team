import React, { useState } from 'react';
import Header from '../components/Header';
import { Interest, NLPChart, Post } from 'utils/types';
import { Button, Container, Modal, Row as SuiteRow } from 'rsuite';
import { useLocation } from 'react-router-dom';
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
// import downloadIcon from '../assets/img/download-01.svg';

const SocialPage: React.FC = () => {
    const location = useLocation();
    const [query,] = useState<string>(location.state?.socialSearchData?.searchValue || '');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: stats, isLoading: statsLoading } = useQuery<Interest, Error>(['Word-Interest', query], () => {
        return wordStatistics(query);
    },);

    const { data: posts, isLoading: postsLoading } = useQuery<Post[], Error>(['Word-Posts', query], () => {
        return getPosts(query);
    },);

    const { data: nlpChart, isLoading: nlpLoading, refetch } = useQuery<NLPChart, Error>(['NLP-Chart', query], () => {
        return getNLP(query);
    }, {
        enabled: false
    });

    const handleShow = () => {
        refetch();
        handleOpen();
    }


    return (
        <>
            <Header className="search-header" />
            <Container className="word-overview">
                <Row className='page-boundaries'>
                    <Col style={{ display: "flex", flexDirection: "column", minHeight: "500px" }}>
                        <h3 className='title'>
                            Searched Page: {String(query)}
                        </h3>

                        <Row className='statistics-row'>
                            <Row>
                                <p className='sub-title'>
                                    His Activities
                                </p>
                            </Row>
                            <Row>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(stats?.page_number || 0)}
                                        text="Page Number"
                                        Icon={FiFile}
                                        color="#EDEDF7"
                                        detailList={[String(query), 'page']}
                                    />
                                </Col>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(stats?.posts_number || 0)}
                                        text="Posts Number"
                                        Icon={FiFileText}
                                        color="#F7EDED"
                                        detailList={[String(query), 'post']}
                                    />
                                </Col>
                                <Col>
                                    <FacebookInterestCard
                                        content={statsLoading ? "Loading..." : String(stats?.users_number || 0)}
                                        text="Users Number"
                                        Icon={FiUsers}
                                        color="#ECF3E5"
                                        detailList={[String(query), 'user']}
                                    />
                                </Col>

                            </Row>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <SideList keyword={String(query)} />
                    </Col>
                </Row>

                <Row className='comments-row page-boundaries'>
                    <Row style={{ gap: '24px' }}>

                        <Col xs={"auto"} >
                            <p className='sub-title'>
                                His Comments
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
                    <SuiteRow className='table-row'>
                        <TableCnt isLoading={postsLoading} data={(posts ? posts : [])} />
                    </SuiteRow>
                    <Row >
                        <Col className='d-flex justify-content-center'>
                            <Modal overflow={true} open={open} onClose={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>NLP</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='modalbod'>
                                    {
                                        nlpLoading ?
                                            <p>
                                                Loading...
                                            </p>
                                            :
                                            <img className='NLP-Chart' src={`${nlpChart?.link}`} alt={`${query} image not fount`} />
                                    }
                                </Modal.Body>
                            </Modal>
                            <Button onClick={handleShow} style={{ paddingRight: "120px", paddingLeft: "120px" }} size="lg" className='filter-btn' color='violet' appearance="primary">
                                Show NLP
                            </Button>
                        </Col>
                    </Row>

                </Row>
            </Container>
        </>
    );
};

export default SocialPage;

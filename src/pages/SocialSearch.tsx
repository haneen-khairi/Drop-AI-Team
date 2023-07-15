import React from 'react';
import Header from '../components/Header';
import { SocialSearchQ } from 'utils/types';
import { Container } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import SocialSearchBox from '../components/SocialSearchBox';

const SocialSearch: React.FC = () => {
    const navigate = useNavigate();
    const handleFilterChange = (socialSearchData: SocialSearchQ) => {
        if (socialSearchData.keyword === "word") {
            navigate('/social-word', { state: { socialSearchData } });
        }
    };

    return (
        <>
            <Header className="search-header" />
            <Container className="search-content">
                <SocialSearchBox
                    onFilterChange={handleFilterChange}
                />
            </Container>
        </>
    );
};

export default SocialSearch;

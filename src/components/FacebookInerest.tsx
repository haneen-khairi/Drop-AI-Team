import React from 'react';
import FacebookInterestCard from './FacebookInterestCard';
import { useQuery } from '@tanstack/react-query';
import { FilterData, Interest } from 'utils/types';
import { wordStatistics } from '../utils/api';
import { FiFileText } from '@react-icons/all-files/fi/FiFileText';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { FiFile } from '@react-icons/all-files/fi/FiFile';
import downloadIcon from '../assets/img/download-01.svg';

interface FacebookInterest {
  filter: FilterData;
}

const FacebookInterest: React.FC<FacebookInterest> = ({ filter }) => {
  const { data, isLoading, isError } = useQuery<Interest, Error>(
    ['Interest', filter?.queryset],
    () => wordStatistics(filter?.queryset)
  );

  // isLoading
  if (isLoading) {
    return <h1>loading</h1>;
  }

  // isError
  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div className="facebook-status">
      <p>Facebook User Interest this search</p>
      <a
        download={true}
        href={`https://dropshipping-app-ingsl.ondigitalocean.app/facebook/download_csv_userID/${filter.queryset}`}
        className="filter-btn go-btn rs-btn rs-btn-primary rs-btn-violet rs-btn-lg"
      >
        <img src={downloadIcon} alt="downloadIcon" />
        Download
      </a>

      <FacebookInterestCard
        content={String(data?.page_number)}
        text="Page Number"
        Icon={FiFile}
        color="#EDEDF7"
        detailList={[String(filter?.queryset), 'page']}
      />
      <FacebookInterestCard
        content={String(data?.posts_number)}
        text="Posts Number"
        Icon={FiFileText}
        color="#F7EDED"
        detailList={[String(filter?.queryset), 'post']}
      />
      <FacebookInterestCard
        content={String(data?.users_number)}
        text="Users Number"
        Icon={FiUsers}
        color="#ECF3E5"
        detailList={[String(filter?.queryset), 'user']}
      />
    </div>
  );
};

export default FacebookInterest;

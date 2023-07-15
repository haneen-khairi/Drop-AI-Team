import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SideProductGeneric } from 'utils/types';
import { getRelatedItems } from '../utils/api';
import SmallCard from './SmallCard';
import { List } from 'rsuite';

interface SideItemList {
  keyword: string;
}

const SideList: React.FC<SideItemList> = ({ keyword }) => {
  // api
  const { data, isLoading, isError } = useQuery<SideProductGeneric[], Error>(
    ['SideProducts-Interest', keyword],
    () => getRelatedItems(keyword)
  );

  // isLoading
  const loadCollection = (list_: SideProductGeneric[]) => {
    return list_?.length > 0 ? list_.map((item, index) => (
      <List.Item key={index}>
        <SmallCard product={item} />
      </List.Item>
    )) : <div>
      No items found
    </div>
  };

  return (
    <div className="facebook-status side-list-di">
      <p>Products may interest you</p>
      <List>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching products</div>
        ) : data && (<>
          {loadCollection(data)}
        </>)
        }
      </List>
    </div>
  );
};

export default SideList;

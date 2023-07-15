import React from 'react';
import { Product } from 'utils/types';
import Card from './Card';
import { FlexboxGrid } from 'rsuite';
import { Link } from 'react-router-dom';

interface Collection {
    records?: Product[];
    isLoading: boolean;
    isError: boolean;
    collectionIcon: string;
    collectionTitle: string;
    seeMorePath: string;
}

const Collection: React.FC<Collection> = ({ records, isLoading, isError, collectionIcon, collectionTitle, seeMorePath }) => {

    const loadCollection = (prods: Product[]) => {
        return prods.map((item: Product) => {
            return (
                <Card key={item.id} product={item} />
            )
        })
    };

    return (
        <FlexboxGrid className='collection'>
            <div className='flex-col-container'>
                <div className='collection-header'>
                    <div className='collection-tag'>
                        <img className='collection-img' src={collectionIcon} alt="collection-Icon" />
                        <p className='collection-title'>
                            {collectionTitle}
                        </p>
                    </div>

                    <Link to={`/${seeMorePath}`}>See More</Link>
                </div>
                <FlexboxGrid justify="center" className='collection-items' >
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : isError ? (
                        <div>Error fetching products</div>
                    ) : records && records.length > 0 ? (<>
                        {loadCollection(records)}
                    </>) : (
                        <div>
                            No items found
                        </div>
                    )
                    }
                </FlexboxGrid>
            </div>
        </FlexboxGrid>
    );
};

// Collection.defaultProps = {
//     records: [
//         // Default list of products
//         {
//             name: 'Default Product 1',
//             price: 0,
//             category: '',
//             image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
//             date: '',
//             rate: 0,
//             providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png',
//         },
//         {
//             name: 'Default Product 2',
//             price: 0,
//             category: '',
//             image: 'https://m.media-amazon.com/images/I/51-+O3-wFxL._AC_UF1000,1000_QL80_.jpg',
//             date: '',
//             rate: 0,
//             providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png',
//         },
//     ]
// };


export default Collection;
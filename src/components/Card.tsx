import React, { useState } from 'react';
import { Button, IconButton } from 'rsuite';
import { Product } from 'utils/types';
import amazonLogo from '../assets/img/Amazon_icon.png';
import aliLogo from '../assets/img/aliE_icon.png';
import cjLogo from '../assets/img/cj_icon.png';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder';
import { MdFavorite } from '@react-icons/all-files/md/MdFavorite';
import { useNavigate } from 'react-router-dom';
import { addToFavourite, removeFavourite } from 'utils/api';


type InvalidateQueryFn = () => Promise<void>;

interface ProductCardProps {
  product: Product;
  invalidateQ?: InvalidateQueryFn;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, invalidateQ }) => {
  const navigate = useNavigate();
  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`, { state: { product } });
  };

  const [fav, setFav] = useState<boolean>(product.user_data?.length > 0 && product.user_data[0]?.fav_added == true);
  const [loading, setLoading] = useState(false);

  const getIcon = (comp: string) => {
    switch (comp) {
      case "Amazon":
        return amazonLogo;
      case "Ali_express":
        return aliLogo;
      case "Cj_Dropshipping":
        return cjLogo;
      default:
        return '';
    }
  }

  const handleButtonClick = async () => {
    setLoading(true);

    try {
      if (!fav) {
        const response = await addToFavourite(product.id);
        if (response.Data === "success") {
          setFav(true);
        }

      } else {
        const response = await removeFavourite(product.id);
        if (response.Data === "success") {
          setFav(false);
        }
      }
      invalidateQ && await invalidateQ();
    } catch (error) {
      console.log('error handling request:', error);
    }

    setLoading(false);
  };

  return (
    <div className="product-card">
      <IconButton disabled={loading} onClick={handleButtonClick} className='fav-btn' icon={fav ? <MdFavorite /> : <MdFavoriteBorder />} circle size="md" />
      <img
        src={product.image_url}
        alt={product.name}

        className="product-image"
      />
      <div className="product-details">
        <div className="line-one">
          <p className="product-name">{product.name}</p>
          <img
            className="product-source-img"
            data-source={product.website}
            src={getIcon(product.website)}
            alt="source_logo"
          />
        </div>
        <div className="line-two">
          <p className="price">{product.price}$</p>

          <p className="rating">
            <AiFillStar color="#FFCE31" /> ({product.rating || '0.0'})
          </p>
        </div>
        <div className="line-three">
          <p>{product.created_date}</p>
        </div>
      </div>
      <Button
        size="lg"
        color="violet"
        onClick={() => handleViewDetails(product.id)}
        className="filter-btn go-btn"
        appearance="primary"
      >
        GO
      </Button>
    </div>
  );
};

export default ProductCard;

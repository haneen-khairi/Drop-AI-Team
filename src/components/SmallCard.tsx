import React from 'react';
import { Button } from 'rsuite';
import { SideProductGeneric } from 'utils/types';
import amazonLogo from '../assets/img/Amazon_icon.png';
import aliLogo from '../assets/img/aliE_icon.png';
import cjLogo from '../assets/img/cj_icon.png';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: SideProductGeneric;
}

const SmallCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`, { state: { product } });
  };

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

  return (
    <div className="sm-product-card">
      <img
        src={product.image_url}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <p className="product-name">{product.name}</p>
        <div className="line-one">
          <img
            className="product-source-img"
            data-source={product.website}
            src={getIcon(product.website)}
            alt="source_logo"
          />
          <p>{product.website}</p>
        </div>

        <div className="line-three">
          <Button
            size="sm"
            color="violet"
            onClick={() => handleViewDetails(product.id)}
            className="filter-btn go-btn"
            appearance="primary"
          >
            GO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;

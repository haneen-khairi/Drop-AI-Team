import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Divider, FlexboxGrid, Row } from "rsuite";
import { Button } from "rsuite";
import {
  PriceLocation,
  ProductDetails as ProductDetailsType,
  SimilarProducts,
} from "utils/types";
import amazonLogo from "../assets/img/Amazon_icon.png";
import aliLogo from "../assets/img/aliE_icon.png";
import cjLogo from "../assets/img/cj_icon.png";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { FaWarehouse } from "@react-icons/all-files/fa/FaWarehouse";
import { FaClipboardList } from "@react-icons/all-files/fa/FaClipboardList";
import { BiLike } from "@react-icons/all-files/bi/BiLike";
import { FaParachuteBox } from "@react-icons/all-files/fa/FaParachuteBox";
import { FaBoxes } from "@react-icons/all-files/fa/FaBoxes";
import { HiOutlineChatAlt } from "@react-icons/all-files/hi/HiOutlineChatAlt";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails, fetchSimilarProducts } from "utils/api";
import min from "../assets/img/min.svg";
import max from "../assets/img/max.svg";
import website from "../assets/img/website.svg";
import MiniChart from "../components/MiniChart";
import axios from "axios";

interface DataPoints {
  [key: string]: number | null;
}
interface OldPrice {
  date: string;
  price: any;
}
const ProductDetails: React.FC = () => {
  const [prices, setPrices] = useState<any>()
  const { id } = useParams<{ id: string }>();
  const {
    data,
    isLoading: dataLoading,
    isError: dataError,
  } = useQuery<ProductDetailsType, Error>(["ai-suggestions", id], () =>
    fetchProductDetails(id || '')
  );
  async function getPrices(name:string){
    await axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/items/google_bard/?question=item_history&item=${name}`).then((data) => {
      console.log(data.data.prices)
      const prices = data.data.prices;
      const pricesArray = Object.keys(prices).map(key => {
        return {
          date: key,
          price: prices[key]
        };
      });
      console.log(pricesArray)
      setPrices(pricesArray)
    }).catch((error) => {
      console.log(error)
    })
  } 
  // api
  const {
    data: dataSimilarProducts,
    isLoading: isLoadingSimilarProducts,
    // isError: isErrorSimilarProducts,
  } = useQuery<SimilarProducts, Error>(["SimilarProducts", id], () =>
    fetchSimilarProducts(id || '')
  );

  const getIcon = (comp: string) => {
    switch (comp) {
      case "Amazon":
        return amazonLogo;
      case "Ali_express":
        return aliLogo;
      case "Cj_Dropshipping":
        return cjLogo;
      default:
        return "";
    }
  };

  const formatDataForChart = (): DataPoints => {
    const result: { [key: string]: number | null } =
      data && data.table?.length > 0
        ? data.table.reduce((acc, entry) => {
          const [key, val] = Object.entries(entry)[0];
          acc[key] = val != "" && val != null ? Number(val) : null;

          return acc;
        }, {} as { [key: string]: number | null })
        : {};
    return result;
  };

  const noChartPlaceHolder = () => {
    return <>
      <div className='chart-section'>
        <p className='chart-title'>Price History</p>

        <div className='no-chart-placeholder'>
          No Valid Data For Chart
        </div>
      </div>

    </>
  }
  useEffect(() => {
    if(data?.name === undefined){
      return;
    }
    getPrices(data?.name)
    console.log('name of produxxt', data?.name)
  }, [data?.name])
  
  if (dataLoading) {
    return (
      <>
        <Header className="search-header" />
        <Container className="search-content">
          <div>Loading...</div>
        </Container>
      </>
    );
  }

  if (dataError) {
    return (
      <>
        <Header className="search-header" />
        <Container className="search-content">
          <div>Error loading data</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header className="search-header" />
      <Container className="search-content">
        <FlexboxGrid className="details-main-content2">
          <div className="card details-card p2">
            <img
              src={data.image_url}
              alt={data.name}
              className="product-image"
            />
            <div className="product-details">
              <div className="line-one">
                <p className="product-name">{data.name}</p>
                <img
                  className="product-source-img"
                  data-source={data.website}
                  src={getIcon(data.website)}
                  alt="source_logo"
                />
              </div>

              {/* component remake */}
              <div className="prices">
                <div className="small-card">
                  <div className="small-card-label">
                    <img className="small-card-icon" src={website} alt="" />
                    <p className="small-card-title"> Websites Number </p>
                  </div>
                  <p className="small-card-value">{data?.websites_number}</p>
                </div>
                <div className="small-card">
                  <div className="small-card-label">
                    <img className="small-card-icon" src={max} alt="" />
                    <p className="small-card-title"> Max price </p>
                  </div>
                  <p className="small-card-value">{data?.max_price}$</p>
                </div>
                <div className="small-card">
                  <div className="small-card-label">
                    <img className="small-card-icon" src={min} alt="" />
                    <p className="small-card-title"> Min price </p>
                  </div>
                  <p className="small-card-value">{data?.min_price}$</p>
                </div>
              </div>
              {/* ends here */}

              <Button
                size="lg"
                color="violet"
                onClick={() => window.open(data?.link, "_blank")}
                className="filter-btn go-btn"
                appearance="primary"
              >
                Go to orginal website
              </Button>
              <div className="line-two">
                <div className="state-item">
                  <AiFillStar className="symbol" color="#FFCE31" />
                  <p>Rate</p>({data.rating || "0.0"})
                </div>
                {data.inventory_cj !== "" && (
                  <div className="state-item">
                    <FaWarehouse className="symbol" color="#3c3f43" />
                    <p>inventory</p>({data.inventory_cj})
                  </div>
                )}
                {data.lists_cj !== "" && (
                  <div className="state-item">
                    <FaClipboardList className="symbol" color="#3c3f43" />
                    <p>List</p>({data.lists_cj})
                  </div>
                )}
                {data.number_of_likes_ali !== "" && (
                  <div className="state-item">
                    <BiLike className="symbol" color="#3498ff" />
                    <p>Like</p>({data.number_of_likes_ali})
                  </div>
                )}
                {data.number_of_orders_ali !== "" && (
                  <div className="state-item">
                    <FaParachuteBox className="symbol" color="#3c3f43" />
                    <p>Orders</p>({data.number_of_orders_ali})
                  </div>
                )}
                {data.number_of_pieces_ali !== "" && (
                  <div className="state-item">
                    <FaBoxes className="symbol" color="#3c3f43" />
                    <p>Stock</p>({data.number_of_pieces_ali})
                  </div>
                )}
                {data.number_of_reviews_ali !== "" && (
                  <div className="state-item">
                    <HiOutlineChatAlt className="symbol" color="#3c3f43" />
                    <p>Reviews</p>({data.number_of_reviews_ali})
                  </div>
                )}
              </div>
              <div className="line-two">
              <Link to={`/showfactory?productName=${data.name}`}>
                  <Button
                    size="lg"
                    color="violet"
                    className="filter-btn go-btn"
                    appearance="primary"
                  >Show Factories</Button>
                </Link>
              <Link to={`/showcountry?productName=${data.name}`}>
                  <Button
                    size="lg"
                    color="violet"
                    className="filter-btn go-btn"
                    appearance="primary"
                  >Show Country</Button>
                </Link>
              </div>
            </div>
          </div>

          {dataLoading ? <>loading...</> : prices && prices?.length > 0 ?
            <MiniChart chartData={formatDataForChart()} prices={prices}  />
            : noChartPlaceHolder()}
          {/* <img src={graph_PH} alt="" /> */}
        </FlexboxGrid>

        <Divider />
        <div>
          <Row className="simiItemLists">
            <Col className="itemsList" xs={12}>
              {isLoadingSimilarProducts ? (
                "loading..."
              ) : dataSimilarProducts &&
                dataSimilarProducts?.with_price?.length > 0 ? (
                dataSimilarProducts?.with_price.map(
                  (el: PriceLocation, idx) => (
                    <div className="similar-products-card" key={idx}>
                      <div className="name">{el.Name_Site}</div>
                      <div className="price">{el.Price} </div>
                      <a
                        href={el.URL}
                        className="filter-btn go-btn rs-btn rs-btn-primary rs-btn-violet rs-btn-lg"
                      >
                        Go
                      </a>
                    </div>
                  )
                )
              ) : (
                <div>No items found</div>
              )}
            </Col>
            <Col className="itemsList" xs={12}>
              {isLoadingSimilarProducts ? (
                "loading..."
              ) : dataSimilarProducts &&
                dataSimilarProducts?.no_price?.length > 0 ? (
                dataSimilarProducts?.no_price.map((el: PriceLocation, idx) => (
                  <div className="similar-products-card" key={idx}>
                    <div className="name">{el.Name_Site}</div>
                    <a
                      href={el.URL}
                      className="filter-btn go-btn rs-btn rs-btn-primary rs-btn-violet rs-btn-lg"
                    >
                      Go
                    </a>
                  </div>
                ))
              ) : (
                <div>No items found</div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ProductDetails;
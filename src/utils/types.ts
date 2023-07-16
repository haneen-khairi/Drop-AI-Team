export interface FilterData {
  queryset: string;
  website: string;
  from_price: string;
  to_price: string;
  from_date: Date | null;
  to_date: Date | null;
  category: string,
  page: number
}

export interface fav {
  fav_added: boolean
}

export interface Product {
  _id: string;
  name: string;
  price: string;
  price_date_update: string;
  estimated_profit: number;
  Lists: string;
  created_date: string; //2023-06-08
  image_url: string;
  website: string;
  id: string;
  link: string;
  rating: string;
  user_data: [fav]
  inventory_cj: number,
  lists_cj: number,
  number_of_reviews_ali: string,
  number_of_orders_ali: string,
  number_of_pieces_ali: string,
  number_of_likes_ali: string,
}

export type SideProduct = {
  _id: string;
  name: string;
  price: number;
  website: string;
  Category: null;
  created_date: string;
  id: string;
  link: string;
  rating: string;
};

export type SideProductObjDetail = SideProduct & {
  image_url: { detail: string } | string;
};

export type SideProductGeneric = SideProduct & {
  image_url: string;
};

export interface FilterSearchResponse {
  data: Product[];
  total_documents: number;
}

export interface MoreItemsResponse {
  today_deals_mongo?: Product[];
  tiktok_mongo?: Product[];
  top_50_stores?: Product[];
  total_documents: number;
}

export interface PriceLocation {
  URL: string;
  Name: string;
  Price: string;
  Currency: string;
  Name_Site: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  details: {
    "Customer Reviews": string;
  };
  image_url: string;
  website: string;
  search_term: string;
  websites_number: number;
  min_price: number;
  max_price: number;
  with_price: PriceLocation[];
  no_price: PriceLocation[];
  google: PriceLocation[];
  table: [{ string: string }];
  user_data: [fav]
  inventory_cj: string;
  lists_cj: string;
  number_of_reviews_ali: string;
  number_of_orders_ali: string;
  number_of_pieces_ali: string;
  number_of_likes_ali: string;
  rating: string;
  link: string;
}

export interface Children {
  children: React.ReactNode;
}

export interface StyleSheet {
  style: React.CSSProperties;
}

export interface FlexContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface WebsiteCategory {
  name: string;
}

export interface Interest {
  page_number: number;
  posts_number: number;
  users_number: number;
}

export interface InterestRecord {
  name: string;
  link: string;
}


export interface SimilarProducts {
  search_term: string;
  id: string;
  websites_number: number;
  min_price: number;
  max_price: number;
  with_price: PriceLocation[];
  no_price: PriceLocation[];
  table: [{ string: string }];
}

export interface CategoryTag {
  _id: string
}

export interface CategoriesGrouped {
  amazon: CategoryTag[]
  ali: CategoryTag[]
  cj: CategoryTag[]
}

export interface ResponseData {
  Data: string;
}

export interface SocialSearchQ {
  searchValue: string;
  keyword: string;
}

export interface Comment {
  Content: string;
  Date: string;
}

export interface Post {
  _id: string;
  Post_Content: string;
  page: string;
  Date: string;
  created_date: string;
  Comments: Comment[];
}

export interface NLPChart {
  search_term: string;
  no_comments: number;
  link: string;
}
export interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}
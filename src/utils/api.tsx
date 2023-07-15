import axios from 'axios';
import {
  CategoriesGrouped,
  FilterData,
  FilterSearchResponse,
  Interest,
  InterestRecord,
  MoreItemsResponse,
  NLPChart,
  Post,
  Product,
  ProductDetails,
  ResponseData,
  SideProductGeneric,
  SideProductObjDetail,
  SimilarProducts,
  WebsiteCategory,
} from 'utils/types';
import { formateDate } from './helpers';
interface LoginRequest {
  mobile_number: string;
  password: string;
}
export const login = async (data: LoginRequest): Promise<string> => {
  try {
    const response = await axios.post(
      'https://dropshipping-app-ingsl.ondigitalocean.app/account/login/',
      data
    );

    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('An error occurred');
  }
};
const baseApiURL = 'https://dropshipping-app-ingsl.ondigitalocean.app/';

export const fetchProducts = async (filter: FilterData): Promise<FilterSearchResponse> => {
  try {
    const response = await axios.get(`${baseApiURL}core/items_search/`, {
      params: {
        queryset: filter.queryset,
        website: filter.website,
        from_price: filter.from_price,
        to_price: filter.to_price,
        from_date: filter?.from_date ? formateDate(filter?.from_date) : '',
        to_date: filter?.to_date ? formateDate(filter?.to_date) : '',
        category: filter.category,
        page: filter.page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchWebsiteCategories = async (
  website: string
): Promise<WebsiteCategory[]> => {
  try {
    const response = await axios.get('/api/websitecategories', {
      params: {
        website,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching websites:', error);
    throw error;
  }
  return [];
};

export const fetchAISuggestions = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${baseApiURL}items/aisuggest/`);
    return response.data.top_50_stores;
  } catch (error) {
    console.error('Error fetching ai suggestions:', error);
    throw error;
  }
  return [];
};

export const fetchTodayDeals = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${baseApiURL}items/todaydeals/`);
    return response.data.today_deals_mongo;
  } catch (error) {
    console.error('Error fetching today deals:', error);
    throw error;
  }
  return [];
};

export const fetchTikTok = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${baseApiURL}items/tiktok/`);
    return response.data.tiktok_mongo;
  } catch (error) {
    console.error('Error fetching tiktok data:', error);
    throw error;
  }
  return [];
};

export const fetchProductDetails = async (
  id: string
): Promise<ProductDetails> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/item_details/${id}/a/`
    );
    return response.data.document;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

export const wordStatistics = async (
  keyword: string
): Promise<Interest> => {
  try {
    const response = await axios.get(
      `${baseApiURL}facebook/information_about_keyword/`, {
      params: {
        queryset: keyword,
      },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching information about keyword:', error);
    throw error;
  }
};

export const fetchSimilarProducts = async (
  id: string
): Promise<SimilarProducts> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/item_details/${id}/cat/`
    );

    return response.data.document;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

export const addToFavourite = async (
  id: string
): Promise<ResponseData> => {
  try {
    const response = await axios.post(
      `${baseApiURL}items/add_to_favourite/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to favourite:', error);
    throw error;
  }
};

export const removeFavourite = async (
  id: string
): Promise<ResponseData> => {
  try {
    const response = await axios.delete(
      `${baseApiURL}items/delete_from_favourite/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting from favourite:', error);
    throw error;
  }
};

export const getFavourite = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/get_favourite_items/`
    );
    return response.data.items_data;
  } catch (error) {
    console.error('Error fetching favourite items:', error);
    throw error;
  }
};


export const fetchFilterCategories = async (): Promise<CategoriesGrouped> => {
  try {
    const response_amz = await axios.get(`${baseApiURL}items/get_categories_for_amazon/`);
    const response_ali = await axios.get(`${baseApiURL}items/get_categories_for_ali/`);
    const response_cj = await axios.get(`${baseApiURL}items/get_categories_for_cj/`);


    return {
      amazon: [...response_amz.data.grouped_data],
      ali: [...response_ali.data.grouped_data],
      cj: [...response_cj.data.grouped_data]
    };
  } catch (error) {
    console.error('Error fetching filter categories:', error);
    throw error;
  }
};


export const getPosts = async (
  keyword: string
): Promise<Post[]> => {
  try {
    const response = await axios.get(
      `${baseApiURL}facebook/posts_with_comments_for_word/`, {
      params: {
        queryset: keyword,
      },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching posts with comments for word:', error);
    throw error;
  }
};


export const getNLP = async (
  keyword: string
): Promise<NLPChart> => {
  try {
    const response = await axios.get(
      `${baseApiURL}core/NLP_Chart/${keyword}/`,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching NLP Chart:', error);
    throw error;
  }
};


export const getAISuggestPerPage = async (
  page: number
): Promise<MoreItemsResponse> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/aisuggest_page/`, {
      params: {
        page,
      },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching ai suggest page:', error);
    throw error;
  }
};

export const getTodayDealsPerPage = async (
  page: number
): Promise<MoreItemsResponse> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/todaydeals_page/`, {
      params: {
        page,
      },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching today deals page:', error);
    throw error;
  }
};

export const getTicToktPerPage = async (
  page: number
): Promise<MoreItemsResponse> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/tiktok_page/`, {
      params: {
        page,
      },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching tiktok page:', error);
    throw error;
  }
};


export const fetchinterestList = async (
  keyTypePair: [string, string]
): Promise<InterestRecord[]> => {
  try {
    const [keyword, type] = keyTypePair;
    if (type === "") {
      return [];
    }
    const response = await axios.get(
      `${baseApiURL}facebook/get_${type}s/`, {
      params: {
        queryset: keyword,
      },
    }
    );
    if (type === 'post') {
      return response.data.posts.map((post: { Post_Content: string }) => {
        return {
          name: post.Post_Content,
          link: ''
        };
      });
    } else if (type === 'user') {
      return response.data.users
    } else if (type === 'page') {
      return response.data.pages.map((page: string) => {
        return {
          name: page,
          link: ''
        };
      });
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching interest list:', error);
    throw error;
  }
};


export const getRelatedItems = async (
  keyword: string
): Promise<SideProductGeneric[]> => {
  try {
    const response = await axios.get(
      `${baseApiURL}items/related_items/`, {
      params: {
        queryset: keyword,
      },
    }
    );

    return response.data.map((item: SideProductObjDetail) => {
      const imageUrl = typeof item.image_url === 'object' && item.image_url.detail
        ? item.image_url.detail
        : item.image_url || '';

      return {
        ...item,
        image_url: imageUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching related items:', error);
    throw error;
  }
};
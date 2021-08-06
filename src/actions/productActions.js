import { FETCH_PRODUCTS } from "../types";
import { ORDER_PRODUCTS_BY_PRICE, ORDER_PRODUCTS_BY_CATEGORY } from "../types";
import { product } from "./data"; 
export const fetchProducts = () => async (dispatch) => {
  let data;
  const res = await fetch("https://muigrocery.free.beeceptor.com/groceries");
  if(res.status===429){
    data = product;
  }
  else{
   data = await res.json();
  }
  data.products = data.products.map(item =>({
    ...item, 
    qty:0
  }))
  console.log(data)
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};


export const sortProductsByCatogary = (sortedProducts, sort) => async(dispatch) => {
 
  let productList = product.products;
  productList = productList.map(item =>({
    ...item, 
    qty:0
  }))
  let sortedProducts = productList.filter(item => item.type===sort)
  console.log(sortedProducts)
  dispatch({
    type: ORDER_PRODUCTS_BY_CATEGORY,
    payload: {
      sort: sort,
      items: sortedProducts
        },
  });
};
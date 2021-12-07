import gql from "graphql-tag";
export const FETCH_PRODUCTS_QUERY = gql`
  {
    getAllProducts {
      id
      name
      desc
      images
      location
      category
      inStock
      price
    }
  }
`;
export const FETCH_CATEGORIES = gql`
  {
    getCategory {
      id
      name
      image
    }
  }
`;
export const FETCH_SHIPPING=gql`
{
  getShipping{
    id
    uKToNigeria
    nigeriaToUK
  }
}`

export const FETCH_MESSAGES=gql`
{
  getMessages{

    name
    email
    message
  
  }
}`
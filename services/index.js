const { request, gql } = require('graphql-request');

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
   query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            excerpt
            title
            featuredImage {
              url
            }
            catgories {
              name
              slug
            }
          }
        }
      }
    }    
   `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails{
      posts(orderBy:createdAt_ASC, last:3){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    } 
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails(
      $slug:String!,
      $categories:[String!]
    ){
      posts(
        where:{
          slug_not:$slug,
          AND:{catgories_some:{slug_in $categories}}
        }
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });
  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
      query GetCategories{
        catgories{
          name
          slug
        }
      }
   `;
   const result=await request(graphqlAPI,query);
   return result.catgories;
}
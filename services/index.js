const { request, gql } = require('graphql-request');

const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

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
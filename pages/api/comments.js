import { GraphQLClient ,gql } from 'graphql-request';

const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphcmstoken=process.env.GRAPHQCMS_TOKEN;

export default async function submitComment(req, res) {
  const graphqlClient= new GraphQLClient(graphqlAPI,{
    headers:{
      Authorization:`Bearer ${graphcmstoken}`
    }
  });

  const query=gql`
    mutation CreateComment(
      $name: String!,
      $email: String!,
      $comment: String!,
      $slug: String!
    ){
      createComment(
        data:{
          name:$name,
          email:$email,
          comment:$comment,
          post:{connect:{slug:$slug}}
        }
      )
    }
  `;

  const result=await graphqlClient.request(query,req.body);
  return res.status(200).send(result);
}

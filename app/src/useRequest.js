// useRequest.js
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:8012/paranormax/web`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
});

// const get_missions = gql`
// query MyQuery {
//   entries(section: "missions", orderBy: "dateCreated DESC") {
//     id
//     title
//     ... on missions_default_Entry {
//       id
//       richText
//       missionImage {
//         url
//       }
//     }
//   }
// }`;
// export default get_missions

export function useGetPosts() {
  return useQuery("get-posts", async () => {
    const { getPostList } = await graphQLClient.request(gql`
      query {
        getPostList {
          items {
            _id
            title
            description
            content
          }
        }
      }
    `);
    return getPostList;
  });
}


export function useGetPost(postId) {
  return useQuery(["get-post", postId], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}
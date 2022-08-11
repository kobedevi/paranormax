import { gql } from "@apollo/client";

export const LOAD_MISSIONS = gql`
  query {
    entries(section: "missions", orderBy: "dateCreated DESC") {
      id
      title
      ... on missions_default_Entry {
        id
        richText
        missionImage {
          url
        }
      }
    }
  }
`;
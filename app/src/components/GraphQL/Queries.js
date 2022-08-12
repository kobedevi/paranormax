import { gql } from "@apollo/client";

export const LOAD_MISSIONS = gql`
query {
  entries(section: "missions", orderBy: "dateCreated DESC") {
    id
    title
    ... on missions_default_Entry {
      id
      author {
        username
        photo {
          url
        }
      }
      shortDescription
      tagField {
        id
        title
      }
      missionImage {
        url
      }
      deadline
      denied
    }
  }
}`;

export const LOAD_MISSION_ID = gql`
query {
  entries(section: "missions", id: "65") {
    id
    title
    ... on missions_default_Entry {
      id
      author {
        username
        photo {
          url
        }
      }
			missionStatus
      richText
      tagField {
        title
      }
      missionImage {
        url
      }
      deadline
      assignedTo {
        username
      }
    }
  }
}`;
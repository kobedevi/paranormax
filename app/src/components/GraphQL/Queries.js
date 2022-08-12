import { gql, useQuery } from "@apollo/client";

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
			missionStatus
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

const LOAD_MISSION_ID = gql`
query GetMission($id: [QueryArgument]!){
  entry(section: "missions", id: $id) {
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

export const useMission = (id) => {
  const {error, loading, data} = useQuery(LOAD_MISSION_ID, {
      variables: {
          id
      }
  })

  return {
      loading,
      data,
      error
  }
}
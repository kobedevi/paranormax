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
      authorId
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
      mediumQueue {
				id
			}
      assignedTo {
        username,
        email
      }
    }
  }
}`;

export const GET_USER_CREATED_MISSIONS = gql`
query GetMissionsByUserId($id: [QueryArgument]!){
  entries(section: "missions", authorId: $id) {
    authorId
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
			mediumQueue {
				id
			}
      assignedTo {
        username
      }
    }
  }
}`

export const GET_CANDIDATES_FOR_MISSION = gql`
query GetCandidatesForMission($id: [QueryArgument]!){
  entry(section: "missions", id: $id) {
    ... on missions_default_Entry {
      mediumQueue {
				id,
				username,
				email
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
import { gql } from "@apollo/client";

export const CREATE_MISSION = gql`
mutation createMission(
	$authorId: ID,
    $title: String,
    $short: String,
    $long: String,
	$deadline: DateTime,
) {
  save_missions_default_Entry(authorId: $authorId, missionStatus:"draft" missionTitle: $title, richText: $long, shortDescription: $short, deadline: $deadline) {
    #this is what returns after query
    id
  }
}`;

export const ASSIGN_USER = gql`
mutation assignUser($missionId: ID!, $assignee: [Int]) {
  save_missions_default_Entry(id: $missionId, mediumQueue: $assignee, missionStatus: "pending") {
    id,
    ... on missions_default_Entry {
      title
      missionStatus
      mediumQueue {
        id,
        name
      }
    }
  }
}`;

export const ASSIGN_USER_ACCEPT = gql`
mutation assignUser($missionId: ID!, $assignee: [Int]) {
  save_missions_default_Entry(id: $missionId, mediumQueue: [], missionStatus: "accepted", assignedTo: $assignee) {
    id,
    ... on missions_default_Entry {
      title
      missionStatus
      assignedTo {
        id,
        name
      }
      mediumQueue {
        id,
        name
      }
    }
  }
}`;

export const SET_MISSION_SUCCESS = gql`
mutation assignUser($missionId: ID!) {
  save_missions_default_Entry(id: $missionId, missionStatus: "success") {
    id,
    ... on missions_default_Entry {
      title
      missionStatus
    }
  }
}`;

export const SET_MISSION_FAIL = gql`
mutation assignUser($missionId: ID!) {
  save_missions_default_Entry(id: $missionId, missionStatus: "failed") {
    id,
    ... on missions_default_Entry {
      title
      missionStatus
    }
  }
}`;
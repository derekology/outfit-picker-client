import gql from "graphql-tag";

export const SHOW_ALL_CLOTHES = gql`
  query allClothes($userid: String!) {
    allClothes(userid: $userid) {
      id
      userid
      type
      article
      colour
      weight
      wash
    }
  }
`;

export const CREATE_CLOTHING = gql`
  mutation createClothing(
    $userid: String!
    $type: String!
    $article: String!
    $colour: String!
    $weight: String!
    $wash: Boolean!
    $created: String!
  ) {
    createClothing(
      userid: $userid
      type: $type
      article: $article
      colour: $colour
      weight: $weight
      wash: $wash
      created: $created
    ) {
      id
      userid
      type
      article
      colour
      weight
      wash
      created
    }
  }
`;

export const UPDATE_CLOTHING = gql`
  mutation updateClothing(
    $id: ID!
    $type: String!
    $article: String!
    $colour: String!
    $weight: String!
    $updated: String!
  ) {
    updateClothing(
      id: $id
      type: $type
      article: $article
      colour: $colour
      weight: $weight
      updated: $updated
    ) {
      id
      type
      article
      colour
      weight
      updated
    }
  }
`;

export const DELETE_CLOTHING = gql`
  mutation deleteClothing($id: ID!) {
    deleteClothing(id: $id)
  }
`;

export const WASH_CLOTHING = gql`
  mutation washClothing($id: ID!, $wash: Boolean!) {
    washClothing(id: $id, wash: $wash)
  }
`;

export const SHOW_WEATHER_CLOTHES = gql`
  query weatherApproClothes($approWeight: String!, $userid: String!) {
    weatherApproClothes(weight: $approWeight, userid: $userid) {
      id
      type
      article
      colour
      weight
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_STREAMS_QUERY = gql`
  query getStreams {
    allStreams {
        title
        description
        userId
        id
    }
  }
`;

export const GET_STREAM_BY_ID_QUERY = gql`
  query getStreamById($id: ID!) {
    Stream(id: $id) {
        title
        id
        userId
        description
    }
  }
`;

export const CREATE_STREAM_MUTATION = gql`
  mutation createStream($title: String!, $description: String!, $userId: String!) {
    createStream(title: $title, description: $description, userId: $userId) {
        userId
        title
        description
        id
    }
  }
`;

export const UPDATE_STREAM_MUTATION = gql`
  mutation updateStream($id: ID!, $userId: String!, $title: String!, $description: String!) {
    updateStream(id: $id, userId: $userId, title: $title, description: $description) {
        id
        userId
        title
        description
    }
  }
`;

export const DELETE_STREAM_MUTATION = gql`
  mutation deleteStream($id: ID!) {
    removeStream(id: $id) {
        id
    }
  }
`;

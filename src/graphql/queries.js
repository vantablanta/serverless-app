/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByDate = /* GraphQL */ `
  query TodosByDate(
    $sort: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
  ) {
    todosByDate(
      sort: $sort
      createdAt: $createdAt
      sortDirection: $sortDirection
    ) {
      items {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        sort
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

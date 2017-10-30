# Subkit GraphQL subscriptions API + PouchDB example

[Live example](https://subkit-subscriptions-api.cloud.dropstack.run/graphql)

> Note: This GraphQL-Subscriptions example uses the [Server-Side-Events as HTTP Transport](https://github.com/MikeBild/subscriptions-transport-sse).

## How to use locally

Install it and run:

```bash
npm install
npm run dev
```

## Make GraphQL API Queries

```graphql
query loadAllTodos {
  todos {
    id
    rev
    text
    isCompleted
  }
}

mutation addTodo {
  upsertTodo(input: {text: "hello world!"}) {
    id
    rev
    text
    isCompleted
  }
}

mutation removeTodo {
  deleteTodo(input: {id: "", rev: ""}) {
    id
    rev
    text
    isCompleted
  }
}

subscription onTodoChanged {
  onTodoChanged {
    id
    rev
    text
    isCompleted
  }
}
```

## Deploy it to the cloud with [DropStack](https://dropstack.run)

```bash
npm i -g dropstack-cli
dropstack login
dropstack deploy
```
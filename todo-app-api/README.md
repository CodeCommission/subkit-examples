# Todos GraphQL - PouchDB example

[Live example](https://subkit-todos.cloud.dropstack.run/graphql)

## How to use locally

Install it and run:

```bash
npm install
npm run dev
```

## Make GraphQL API Queries

```graphql
query load_all_todos {
  todos {
    id
    rev
    text
    complete
  }
}

mutation add_todo {
  upsertTodo(input: {text: "hello world!"}) {
    id
    rev
    text
    complete
  }
}

mutation remove_todo {
  deleteTodo(input: {id: "df86d630-6be8-11e7-9130-6bd8310df6f4", rev: "1-f3347d53ed554ca79a37b87a7d85eeb5"}) {
    id
    rev
    text
    complete
  }
}
```

## Deploy it to the cloud with [DropStack](https://dropstack.run)

```bash
npm i -g dropstack-cli
dropstack login
dropstack deploy
```
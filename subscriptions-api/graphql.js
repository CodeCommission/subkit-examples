const { pubsub } = require("subkit");
const uuid = require("uuid");
const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-adapter-memory"));
const todosDB = new PouchDB("tododb", { adapter: "memory" });

todosDB
  .changes({ live: true, include_docs: true })
  .on("change", event => pubsub.publish("todosChannel", event.doc));

export const resolvers = {
  Query: {
    todos: (parent, args, context, info) =>
      context.loaders.todosDB
        .allDocs({ include_docs: true })
        .then(data =>
          data.rows.map(x =>
            Object.assign({}, x.doc, { id: x.doc._id, rev: x.doc._rev })
          )
        )
  },
  Mutation: {
    upsertTodo: (parent, args, context, info) =>
      context.loaders.todosDB
        .put(
          Object.assign({}, args.input, {
            _id: args.input.id || uuid.v1(),
            _rev: args.input.rev
          })
        )
        .then(data =>
          Object.assign({}, args.input, { id: data.id, rev: data.rev })
        ),
    deleteTodo: (parent, args, context, info) =>
      context.loaders.todosDB
        .remove({ _id: args.input.id, _rev: args.input.rev })
        .then(args.input)
  },
  Subscription: {
    onTodoChanged: (parent, args, context, info) =>
      Object.assign({}, parent, { id: parent._id, rev: parent._rev })
  }
};

export const loaders = {
  todosDB
};

export const channels = {
  onTodoChanged: (options, args) => ({
    todosChannel: { filter: event => true }
  })
};

export const directives = {};

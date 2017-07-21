const {pubsub} = require('subkit')
const uuid = require('uuid')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const todosDB = new PouchDB('tododb', {adapter: 'memory'})

todosDB.changes({live: true, include_docs: true}).on('change', event => pubsub.publish('todosChannel', event.doc))

export const resolvers = {
  Query: {
    todos: (parent, args, context, info) => context.loaders.todosDB.allDocs({include_docs: true})
      .then(data => data.rows.map(x => ({...x.doc, id: x.doc._id, rev: x.doc._rev})))
  },
  Mutation: {
    upsertTodo: (parent, args, context, info) => context.loaders.todosDB.put({...args.input, _id: args.input.id || uuid.v1(), _rev: args.input.rev})
      .then(data => ({...args.input, id: data.id, rev: data.rev})),
    deleteTodo: (parent, args, context, info) => context.loaders.todosDB.remove({_id: args.input.id, _rev: args.input.rev})
      .then(args.input)
  },
  Subscription: {
    onChangedTodo: (parent, args, context, info) => ({...parent, id: parent._id, rev: parent._rev}),
  }
}

export const loaders = {
  todosDB,
}

export const channels = {
  onChangedTodo: (options, args) => ({
    todosChannel: {filter: event => true},
  })
}
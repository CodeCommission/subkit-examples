const uuid = require('uuid')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-adapter-memory'))
const db = new PouchDB('tododb', {adapter: 'memory'})

export const resolvers = {
  Query: {
    todos: (parent, args, context, info) => db.allDocs({include_docs: true})
      .then(data => data.rows.map(x => Object.assign({}, x.doc, {id: x.doc._id, rev: x.doc._rev})))
  },
  Mutation: {
    upsertTodo: (parent, args, context, info) => db
      .put(Object.assign({}, args.input, {_id: args.input.id || uuid.v1(), _rev: args.input.rev}))
      .then(data => Object.assign({}, args.input, {id: data.id, rev: data.rev})),
    deleteTodo: (parent, args, context, info) => db
      .remove({_id: args.input.id, _rev: args.input.rev})
      .then(args.input)
  }
}

export const loaders = {

}

export const channels = {

}

export const directives = {

}
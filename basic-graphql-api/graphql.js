const crypto = require('crypto')

export const resolvers = {
  Item: {
    picture: (parent, args, context, info) => {
      const pictureHash = crypto.createHash('md5').update(parent.email).digest('hex')
      return ({
        link: `https://www.gravatar.com/avatar/${pictureHash}`,
      })
    },
  },
  Query: {
    items: (parent, args, context, info) => context.loaders.items.all(),
    item: (parent, args, context, info) => context.loaders.items.load(args.id),
  },
  Mutation: {
    upsertItem: (parent, args, context, info) => context.loaders.items.upsert(args.input),
    removeItem: (parent, args, context, info) => context.loaders.items.remove(args.id),
  },
  Subscription: {
    onItemUpserted: (source, args, context, info) => context.loaders.items.load(source.id),
  },
}

const itemsStore = {}
export const loaders = {
  items: {
    load: id => itemsStore[id],
    all: () =>  Object.values(itemsStore),
    upsert: input => itemsStore[input.id] = input,
    remove: id => delete itemsStore[id],
  },
}

export const channels = {
  onItemUpserted: (options, args) => ({
    itemsChannel: {filter: event => true},
  }),
}

export const directives = {
}
const {GraphQLString, GraphQLBoolean, GraphQLNonNull} = require('graphql')
const {DirectiveLocation} = require('graphql/type/directives')
const format = require('es6-template-strings')

export const resolvers = {
}

export const loaders = {
}

export const channels = {
}

export const directives = {
  toLowerCase: {
    description: 'Transform result to lowercase.',
    locations: [DirectiveLocation.FIELD],
    resolve: (resolve, parent, args, ctx, info) => resolve().then(result => result.toLowerCase()),
  },
  toFormatString: {
    description: 'Transform result to ES6 template string.',
    locations: [DirectiveLocation.FIELD],
    args: {template: {type: new GraphQLNonNull(GraphQLString)}, parent: {type: GraphQLBoolean}},
    resolve: (resolve, parent, args, ctx, info) => resolve().then(result => format(args.template, args.parent ? parent : {[`${info.fieldName}`]: result}, {partial: true})),
  },
}
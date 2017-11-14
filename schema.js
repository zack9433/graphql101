const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')

const users = [
  {
    id: '1',
    name: 'zack',
    age: 33
  },
  {
    id: '2',
    name: 'donald',
    age: 30
  }
]

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return users.find(user => user.id === args.id)
      }
    },
  }
})

const schema = new GraphQLSchema({
  query: RootQuery
})

module.exports = schema;
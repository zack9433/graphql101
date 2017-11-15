const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')
const axios = require('axios')

const StudentType = new GraphQLObjectType({
  name: 'Student',
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

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    student: {
      type: StudentType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`http://localhost:3001/students/${args.id}`).then(res => res.data)
      }
    },
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema;
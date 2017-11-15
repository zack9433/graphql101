const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')

const students = [
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
        return students.find(student => student.id === args.id)
      }
    },
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema;
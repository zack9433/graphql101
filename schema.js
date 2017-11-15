const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql')
const axios = require('axios')

const ClassType = new GraphQLObjectType({
  name: 'Class',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent) {
        const resources = parent.studentId.map(id => axios.get(`http://localhost:3001/students/${id}`));
        return axios.all(resources).then(results => results.map(result => result.data))
      }
    }
  })
})

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    classes: {
      type: new GraphQLList(ClassType),
      resolve(parent) {
        const resources = parent.studentId.map(id => axios.get(`http://localhost:3001/students/${id}`))
        return axios.all(resources).then(results => results.map(result => result.data))
      }
    }
  })
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
    class: {
      type: ClassType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`http://localhost:3001/classes/${args.id}`).then(res => res.data)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema;
const graphqlHTTP = require('express-graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");
const data = require('./data');

const AboutPageDataType = new GraphQLObjectType({
    name: `AboutPageData`,
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: new GraphQLList(GraphQLString) },
        imageUrl: { type: GraphQLString },
        id: { type: GraphQLInt }
    })
});


const QueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allPageData: {
            type: new GraphQLList(AboutPageDataType),
            resolve: ((parent, args) => data.map((page, i) => ({
                title: page.title,
                content: page.content,
                imageUrl: page.imageUrl,
                id: i,
            })))
        },
        pageData: {
            type: AboutPageDataType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: ((_, {id}) => {
                return {
                    title: data[id].title,
                    content: data[id].content,
                    imageUrl: data[id].imageUrl,
                    id: id,
                }
            })
        },
        randomPageData: {
            type: AboutPageDataType,
            resolve: ((parent, args) => {
                const id = Math.floor(Math.random() * data.length);
                return {
                    title: data[id].title,
                    content: data[id].content,
                    imageUrl: data[id].imageUrl,
                    id: id,
                }
            })
        }
    }
});

const schema = new GraphQLSchema({query: QueryType});


function xiaoxihomeAboutpageData(app) {
    app.use('/aboutpagedata', graphqlHTTP({
        schema: schema,
        graphiql: false
    }))
}

module.exports = xiaoxihomeAboutpageData;
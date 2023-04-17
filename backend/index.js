const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
const {ApolloServer} =require('apollo-server')
const typeDefs=require('./graphql/typeDefs')
const resolvers=require('./graphql/resolvers')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server=new ApolloServer({
    typeDefs,
    resolvers
})

// connect database
mongoose.connect('mongodb://localhost:27017/graphql',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Mongodb Connection successful")
    return server.listen({port:5000})
})
.then((res)=>{
    console.log(`server running at ${res.url}`)
})

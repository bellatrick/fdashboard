import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context'
const httpLink = createHttpLink({
    uri: 'https://enigmatic-mountain-31303.herokuapp.com'
})
const authLink=setContext(()=>{
    const token=localStorage.getItem('jwttoken')
    return{
headers:{
    Authorization:token? `Bearer ${token}`:''
}
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
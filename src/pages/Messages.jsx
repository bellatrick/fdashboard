import React from 'react'
import Layout from '../components/Layout'
import { FETCH_MESSAGES } from "../utils/Graphql";
import { useQuery } from "@apollo/react-hooks";
import MessageList from '../components/MessageList';
const Messages = () => {
    const { loading, data } = useQuery(FETCH_MESSAGES);

    return (
        <Layout>
            <MessageList loading={loading} data={data}/>
        </Layout>
    )
}

export default Messages

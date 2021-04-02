import React from 'react';
import { useLazyQuery, useSubscription } from "@apollo/client";
import { Messages } from "../../graphql/queries/Messages";
import { useStateLayer } from "../../StateLayer/StateLayer";
import { MessageSent } from '../../graphql/subscriptions/MessageSent';

export function useGetMessages() {
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(Messages, {
        fetchPolicy: 'no-cache'
    });

    const [{ user, messages }, dispatch] = useStateLayer();
    const [messagesBackup, setMessagesBackup] = React.useState([]);

    const { data: subscriptionData } = useSubscription(MessageSent, {
        variables: {
            userId: user.id
        }
    });

    React.useEffect(() => {
        dispatch({ type: 'SET_SELECTED_USER', payload: selectedUser })
        if (selectedUser) {
            getMessages({ variables: { receiverId: selectedUser } })
        }
    }, [selectedUser])

    React.useEffect(() => {
        if (messagesData?.messages) {
            setMessagesBackup([...messagesData.messages]);
        }
        dispatch({ type: 'SET_MESSAGES', payload: messagesData?.messages });
    }, [messagesData])

    React.useEffect(() => {
        dispatch({ type: 'SET_LOADING_MESSAGES', payload: messagesLoading })
    }, [messagesLoading])

    React.useEffect(() => {
        if (messages) {
            setMessagesBackup([...messages]);
        }

        return () => null;
    }, [messages])

    React.useEffect(() => {
        if (subscriptionData?.messageSent) {
            const message = subscriptionData.messageSent;
            if (
                (message.sender.id === user.id && message.receiver.id === selectedUser) ||
                (message.sender.id === selectedUser && message.receiver.id === user.id)
            ) {
                const messageExists = messages.find(msg => msg.id === message.id);
                console.log({messageExists});
                if(!messageExists) {
                    dispatch({ type: 'SET_MESSAGES', payload: [...messagesBackup, message] })
                } else {
                    dispatch({ type: 'UPDATE_MESSAGE', payload: message });
                }
            }
        }
    }, [subscriptionData])


    return { selectedUser, setSelectedUser, };
}
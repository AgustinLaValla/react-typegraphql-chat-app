import React from 'react'
import { useStateLayer } from '../../StateLayer/StateLayer';
import { useMutation } from '@apollo/client';
import { AddMessage } from '../../graphql/mutations/AddMessage';
import { Button } from 'react-bootstrap';

export default function Footer() {
    const [message, setMessage] = React.useState('');
    const [{ selectedUser, userListOffsetHeight }] = useStateLayer();
    const [addMessage] = useMutation(AddMessage, {
        onCompleted() {
            setMessage('');
        }
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!message) return;
        addMessage({
            variables: {
                content: message,
                receiverId: selectedUser
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="footer"
            style={{ width: `calc(100% - ${userListOffsetHeight}px)`, left: userListOffsetHeight }}
        >
            <input
                type="text"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
            />
            <Button
                type="submit"
                onKeyUp={handleSubmit}
                className="btn btn-primary"
            >
                <i className="fas fa-paper-plane"></i>
            </Button>
        </form>
    )
}

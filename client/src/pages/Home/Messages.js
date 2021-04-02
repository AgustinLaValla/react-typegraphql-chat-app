import React from 'react'
import { Col } from 'react-bootstrap'
import { useStateLayer } from '../../StateLayer/StateLayer';
import Message from './Message';
import Footer from './Footer';

export default function Messages() {
    const [{ messages, loadingMessages, user }] = useStateLayer();
    const messagesContainerRef = React.useRef();

    React.useEffect(() => {
        if (messagesContainerRef && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages])

    return (
        <Col xs={10} md={8} className="pb-5 pt-4 messages" ref={messagesContainerRef} style={{
            flexDirection: messages && messages.length ? 'column' : 'column'
        }}>
            {loadingMessages && <p>'Loading Messages...'</p>}
            {messages && messages.length && messages.map(message =>
                <Message key={message.id} message={message} user={user} />
            )}
            {messages && !messages.length && <p>You are now  connected! Send your first message!</p>}
            {!messages && !loadingMessages && <p>Select a Friend</p>}
        </Col>
    )
}

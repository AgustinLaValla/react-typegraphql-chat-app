import React from 'react'
import * as moment from 'moment/moment';
import { OverlayTrigger, Tooltip, Button, Popover } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ReactToMessage } from '../../graphql/mutations/ReactToMessage';

export default function Message({ message, user }) {
    const sentByCurrentUser = user.id === message.sender.id;

    const [showPopOver, setShowPopOver] = React.useState(false);
    const reactions = ['❤️', '😂', '👍', '👎', '😡', '😮'];
    const [reactToMessage] = useMutation(ReactToMessage);

    const react = (reaction) => {
        reactToMessage({
            variables: {
                messageId: message.id,
                reaction
            }
        })
        setShowPopOver(false);
    };

    const reactButton = (
        <OverlayTrigger
            trigger="click"
            placement="top"
            show={showPopOver}
            onToggle={() => setShowPopOver(!showPopOver)}
            transition={false}
            rootClose
            overlay={
                <Popover className="rounded-pill">
                    <Popover.Content>
                        {reactions.map(reaction => (
                            <Button
                                variant="link"
                                key={reaction}
                                onClick={() => react(reaction)}
                                className="react-icon-button"
                            >
                                {reaction}
                            </Button>
                        ))}
                    </Popover.Content>
                </Popover>
            }
        >
            <Button variant="link">
                <i className="far fa-smile" />
            </Button>
        </OverlayTrigger>
    );

    return (
        <OverlayTrigger
            rootClose
            placement={sentByCurrentUser ? 'left' : 'right'}
            overlay={
                <Tooltip>
                    {moment(message.createdAt).format('MMMM DD, YYYY, @ h:mm a')}
                </Tooltip>
            }
        >
            <div className={`messageWrapper ${sentByCurrentUser ? 'senderBubbleWrapper' : 'receiverBubbleWrapper'}`}>
                {!sentByCurrentUser && reactButton}
                <div className="message">
                    <span>
                        {message.content}
                    </span>
                    {message.reaction &&
                        <span
                            className="reaction"
                            style={{ backgroundColor: sentByCurrentUser ? '#2626c599' : '#fff' }}
                        >
                            {message.reaction}
                        </span>
                    }
                </div>
            </div>
        </OverlayTrigger>
    )
}

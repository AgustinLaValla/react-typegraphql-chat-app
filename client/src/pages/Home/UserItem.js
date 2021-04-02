import React from 'react'
import { Image } from 'react-bootstrap';

export default function UserItem({ user, selectedUser, setSelectedUser }) {
    const userIsSelected = selectedUser === user.id;

    return (
        <div
            className={`home__userItem py-3 ${userIsSelected ? 'bg-white' : ''}`}
            onClick={() => setSelectedUser(user.id)}
        >
            <Image src={user.imageUrl ? user.imageUrl : 'img/avatar.png'} roundedCircle />
            <div className="d-none d-md-block">
                <p className="text-success">{user.username}</p>
                <p>
                    {user.lastMessage.content ? user.lastMessage.content : 'You are connected'}
                </p>
            </div>
        </div>
    )
}

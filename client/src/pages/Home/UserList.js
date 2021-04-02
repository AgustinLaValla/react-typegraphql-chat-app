import React from 'react';
import { useQuery } from '@apollo/client';
import { Col } from 'react-bootstrap';
import { useGetMessages } from '../hooks/HomeHooks';
import { Users } from '../../graphql/queries/Users';
import UserItem from './UserItem';
import { useResizeHandler } from '../hooks/useResizeHandler';

export default function UserList() {
    const { data, loading } = useQuery(Users);
    const { selectedUser, setSelectedUser } = useGetMessages();
    const {ref} = useResizeHandler();

    return (
        <Col xs={2} md={4} className="m-0 p-0 bg-secondary" ref={ref}>
            {loading
                ? <p>Loading...</p>
                : !data.users.users.length
                    ? <p>No users have joined yet</p>
                    : data.users.users.map(user =>
                        <UserItem
                            key={user.id}
                            user={user}
                            setSelectedUser={setSelectedUser}
                            selectedUser={selectedUser}
                        />
                    )
            }
        </Col>
    )
}

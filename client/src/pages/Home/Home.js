import { Row } from 'react-bootstrap';
import { useStateLayer } from '../../StateLayer/StateLayer'
import Header from './Header';
import Messages from './Messages';
import UserList from './UserList';
import Footer from './Footer';
import './Home.scss';


export default function Home() {

    const [{ selectedUser }, dispatch] = useStateLayer();

    return (
        <>
            <Header dispatch={dispatch} />
            <Row className="bg-white mt-2" style={{ height: '75vh', position: 'relative' }}>
                <UserList />
                <Messages />
                {selectedUser && <Footer />}
            </Row>
        </>
    )
}

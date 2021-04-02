import jwtDecode from 'jwt-decode';


export function getToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;

    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 <= Date.now()) {
        localStorage.removeItem('token');
        return null;
    } else {
        return decodedToken;
    }

}
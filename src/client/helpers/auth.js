import cookie from 'react-cookies';
import axios from 'axios';

import { jwtCookieName } from './cookies';

export const authHeaders = () => {
    const jwtCookie = cookie.load(jwtCookieName);
    if (! jwtCookie) return false;
	return { headers: { 'Authorization': 'Bearer ' + jwtCookie } };
}

export const isAuth = () => {
	const jwtCookie = cookie.load(jwtCookieName);
	return new Promise(res => {
		if (! jwtCookie) {
			res({});
		} else {
			axios.get('/api/user/check', authHeaders())
			.then(response => {
                res(response.data)
            })
            .catch(err => {
                console.error('Error fetching token', err);
                res({})
            });
		}
    });
    
}
import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user.data.user));
            sessionStorage.setItem('token', JSON.stringify(user.data.token));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

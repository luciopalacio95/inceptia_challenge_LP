import axios from 'axios';

export default class restQueries {
    login() {
        fetch(process.env.REACT_APP_API_URL+ "/login/", {
            method: "POST",
            body: JSON.stringify({
                email: process.env.REACT_APP_API_USER,
                password: process.env.REACT_APP_API_PASS
            }),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem('token', json.token);
        })
        .finally(() => {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        })
        .catch(err => console.log(err));
    }
}
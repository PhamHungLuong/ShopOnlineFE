import { useState } from 'react';

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState();
    const [email, setEmail] = useState('');

    const logIn = (name, userId, isAdmin, email) => {
        setName(name);
        setIsLoggedIn(true);
        setUserId(userId);
        setIsAdmin(isAdmin);
        setEmail(email);
    };

    const logOut = () => {
        setName('');
        setIsLoggedIn(false);
        setUserId('');
        setIsAdmin(false);
        setEmail('');
    };

    return { isLoggedIn, userId, name, email, isAdmin, logIn, logOut };
};

export default useUser;

import Cookies from 'js-cookie';
import router from 'next/router';
import store from 'store2';

export const logoutAndRedirect = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('userName');
    Cookies.remove('userPassword');
    store.remove('jwt');
    router.push('/');
};

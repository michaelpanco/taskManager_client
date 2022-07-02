import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../../../utils/auth';

interface Props {
    children: any;
    auth?: boolean;
}

function RouteDirector(props: Props) {
    const { children, auth } = props;
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in
        const isPageAuth = auth !== undefined ? true : false;

        if (isLoggedIn()) {
            if (!isPageAuth) {
                router.push('/tasks');
            }
            setAuthorized(true);
        } else {
            console.log('non-authorized');

            if (isPageAuth) {
                router.push('/');
            }
            setAuthorized(true);
            return children;
        }
    }

    return authorized && children;
}

export default RouteDirector;

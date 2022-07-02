import type { NextPage } from 'next';
import GuestLayout from '../components/layouts/Guest';
import Login from '../components/partials/Login';
import RouteDirector from '../components/common/RouteDirector';

const Home: NextPage = () => {
    return (
        <GuestLayout>
            <RouteDirector>
                <Login />
            </RouteDirector>
        </GuestLayout>
    );
};

export default Home;

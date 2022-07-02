import type { NextPage } from 'next';
import GuestLayout from '../../components/layouts/Guest';
import SignUp from '../../components/partials/SignUp';
import RouteDirector from '../../components/common/RouteDirector';

const SignUpPage: NextPage = () => {
    return (
        <GuestLayout>
            <RouteDirector>
                <SignUp />
            </RouteDirector>
        </GuestLayout>
    );
};

export default SignUpPage;

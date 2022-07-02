import { Header, Footer } from '../../partials/Site';
import Cookies from 'js-cookie';
import { logoutAndRedirect } from '../../../utils/logoutAndRedirect';
interface Props {
    children: React.ReactNode;
}

const DashboardLayout = (props: Props) => {
    const { children } = props;

    const logout = () => {
        logoutAndRedirect();
    };

    return (
        <div className="dashboard-layout">
            <Header
                right={
                    <div className="text-white pt-2 text-sm">
                        Hi {Cookies.get('userName')},{' '}
                        <span className="font-bold cursor-pointer" onClick={logout}>
                            Logout
                        </span>
                    </div>
                }
            />
            <div className="guest-content h-full flex flex-col py-5 lulu-global-width m-auto">{children}</div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;

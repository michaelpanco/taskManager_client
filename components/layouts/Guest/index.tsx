import { Header, Footer } from '../../partials/Site';

interface Props {
    children: React.ReactNode;
}

const GuestLayout = (props: Props) => {
    const { children } = props;
    return (
        <div className="guest-layout">
            <Header />
            <div className="guest-content h-full flex flex-col justify-center ">{children}</div>
            <Footer />
        </div>
    );
};

export default GuestLayout;

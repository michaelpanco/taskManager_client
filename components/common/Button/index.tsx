interface Props {
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
    [otherProps: string]: unknown;
}

const Button = (props: Props) => {
    const { variant, children, className, loading, ...otherProps } = props;
    const otherClassNames = className !== undefined ? className : '';
    const isLoading = loading !== undefined ? (loading ? 'loading' : '') : '';

    return (
        <button className={`btn btn-primary max-w text-white ${isLoading} ${otherClassNames}`} {...otherProps}>
            {children}
        </button>
    );
};
export default Button;

interface Props {
    right?: any;
}

export const Header = (props: Props) => {
    const { right } = props;
    return (
        <div className="lulu-bg-1">
            <div className="lulu-global-width m-auto py-1">
                <div className="flex">
                    <div className="w-1/2">
                        <img src="/logo_white.png" width={123} alt="CareLuLu" className="self-center" />
                    </div>
                    <div className="w-1/2 text-right">{right}</div>
                </div>
            </div>
        </div>
    );
};

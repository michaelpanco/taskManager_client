import styles from '../../../styles/shimmer.module.scss';

interface Props {
    count?: number;
    height?: number;
    width?: number;
}

const Shimmer = (props: Props) => {
    let height = props.height ? props.height : 10;
    let count = props.count ? props.count : 1;
    let width = props.width ? props.width : 100;

    return (
        <div>
            {Array(count)
                .fill(1)
                .map((el, i) => (
                    <div key={i} className={styles.placeholder} style={{ width: width + '%' }}>
                        <div className={styles.animated_background} style={{ height: height }}></div>
                    </div>
                ))}
        </div>
    );
};

export default Shimmer;

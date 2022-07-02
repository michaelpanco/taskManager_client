import { useEffect, useState } from 'react';
import InputError from '../../../interface/inputError.interface';

interface Props {
    className?: string;
    [otherProps: string]: unknown;
    errors?: InputError[];
}

const InputPassword = (props: Props) => {
    const { children, className, errors, ...otherProps } = props;
    const otherClassNames = className !== undefined ? className : '';

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const hasError = errors?.find((error) => error.field === otherProps.name);

        if (hasError) {
            errors?.forEach((error: InputError) => {
                if (error.field === otherProps.name) {
                    setHasError(true);
                    setErrorMessage(error.error);
                    return;
                }
            });
        } else {
            setHasError(false);
        }
    }, [errors]);

    return (
        <>
            <input type="password" className={`input input-bordered max-w border-slate-200 ${otherClassNames}`} {...otherProps} />
            {hasError && <div className="text-xs text-red-600 mt-1 ml-2 mb-1">{errorMessage}</div>}
        </>
    );
};

export default InputPassword;

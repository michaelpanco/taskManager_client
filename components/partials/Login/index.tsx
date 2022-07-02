import { useState } from 'react';
import router from 'next/router';
import Button from '../../common/Button';
import { InputText, InputPassword } from '../../common/InputElements';
import { login } from '../../../services/auth/login.service';
import { useAppDispatch } from '../../../app/hooks';
import InputError from '../../../interface/inputError.interface';
import FormValidator from '../../../utils/formvalidator';
import { signInValidation } from './validation';
import store from 'store2';
import Cookies from 'js-cookie';

const Login = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [failedMessage, setFailedMessage] = useState('');

    const dispatch = useAppDispatch();

    const [fieldErrors, setFieldErrors] = useState<InputError[]>([]);

    const [state, modifyState] = useState({
        email: '',
        password: ''
    });

    const setState = (newState: object) => {
        modifyState({
            ...state,
            ...newState
        });
    };

    const callLogin = async (event: any) => {
        event.preventDefault();

        let loginValidation = new FormValidator(signInValidation());

        loginValidation.validateSubmit(state, async (valid: boolean, validationErrors: []) => {
            if (valid) {
                setIsLoggingIn(true);
                try {
                    const params = {
                        email: state.email,
                        password: state.password
                    };
                    let response: any = await dispatch(login(params));

                    if (response.type === 'auth/login/fulfilled') {
                        Cookies.set('isLoggedIn', 'YES');
                        Cookies.set('userName', response.payload.data.name);
                        Cookies.set('userEmail', response.payload.data.email);
                        store('jwt', response.payload.data.access_token);
                        router.push('/tasks');
                    }
                    if (response.type === 'auth/login/rejected') {
                        //@ts-ignore
                        setFailedMessage(response.payload.message);
                        setIsLoggingIn(false);
                    }
                } catch (error) {
                    setIsLoggingIn(false);
                }
            } else {
                setFieldErrors(validationErrors);
            }
        });
    };

    const handleChange = (event: any) => {
        setState({
            [event.target.name]: event.target.value
        });

        setFieldErrors((fieldErrors: any) => {
            const filterArr = fieldErrors.filter((error: any) => {
                return error.field !== event.target.name;
            });

            return filterArr;
        });
        setFailedMessage('');
    };

    const proceedToSignUp = () => {
        router.push('/signup');
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col lg:w-1/4 md:w-2/4 sm:w-3/4 ">
                <div className="text-center text-lg font-bold mb-3">LOGIN</div>
                {failedMessage !== '' && <div className="text-xs text-red-600 ml-2 mb-3 text-center">{failedMessage}</div>}
                <form onSubmit={callLogin} className="flex flex-col">
                    <InputText name="email" placeholder="Email address" value={state.email} onChange={handleChange} errors={fieldErrors} />
                    <InputPassword
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        className="mt-2 mb-2"
                        onChange={handleChange}
                        errors={fieldErrors}
                    />
                    <div className="text-sm text-center">
                        Don't have an account?{' '}
                        <span className="text-pink-500 cursor-pointer hover:underline" onClick={proceedToSignUp}>
                            Sign up
                        </span>
                    </div>
                    <Button className="mt-3" loading={isLoggingIn} onClick={callLogin}>
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Login;

import { useState } from 'react';
import router from 'next/router';
import Button from '../../common/Button';
import { InputText, InputPassword } from '../../common/InputElements';
import { signup } from '../../../services/signup/signup.service';
import { useAppDispatch } from '../../../app/hooks';
import InputError from '../../../interface/inputError.interface';
import FormValidator from '../../../utils/formvalidator';
import { signUpValidation } from './validation';
import store from 'store2';
import Cookies from 'js-cookie';

const SignUp = () => {
    const [signUpProcessing, setSignUpProcessing] = useState(false);
    const [failedMessage, setFailedMessage] = useState('');

    const dispatch = useAppDispatch();

    const [fieldErrors, setFieldErrors] = useState<InputError[]>([]);

    const [state, modifyState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const setState = (newState: object) => {
        modifyState({
            ...state,
            ...newState
        });
    };

    const callSignUp = async (event: any) => {
        event.preventDefault();

        let submitSignUp = new FormValidator(signUpValidation());

        submitSignUp.validateSubmit(state, async (valid: boolean, validationErrors: []) => {
            if (valid) {
                setSignUpProcessing(true);
                try {
                    const params = {
                        name: state.name,
                        email: state.email,
                        password: state.password
                    };
                    let response: any = await dispatch(signup(params));

                    if (response.type === 'account/signup/fulfilled') {
                        Cookies.set('isLoggedIn', 'YES');
                        Cookies.set('userName', response.payload.data.name);
                        Cookies.set('userEmail', response.payload.data.email);
                        store('jwt', response.payload.data.access_token);
                        router.push('/tasks');
                    }
                    if (response.type === 'account/signup/rejected') {
                        //@ts-ignore
                        setFailedMessage(response.payload.message);
                        setSignUpProcessing(false);
                    }
                } catch (error) {
                    setSignUpProcessing(false);
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

    const proceedToLoginIn = () => {
        router.push('/');
    };

    return (
        <div className="flex justify-center items-center mb">
            <div className="flex flex-col lg:w-1/4 md:w-2/4 sm:w-3/4 ">
                {failedMessage !== '' && <div className="text-xs text-red-600 ml-2 mb-3 text-center">{failedMessage}</div>}
                <form onSubmit={callSignUp} className="flex flex-col">
                    <div className="text-center text-lg font-bold mb-3">SIGNUP</div>
                    <InputText name="name" className="mb-2" placeholder="Name" value={state.name} onChange={handleChange} errors={fieldErrors} />
                    <InputText name="email" className="mb-2" placeholder="Email address" value={state.email} onChange={handleChange} errors={fieldErrors} />
                    <InputPassword
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        className="mb-2"
                        onChange={handleChange}
                        errors={fieldErrors}
                    />
                    <div className="text-sm text-center">
                        Already have an account?{' '}
                        <span className="text-pink-500 cursor-pointer hover:underline" onClick={proceedToLoginIn}>
                            Log In
                        </span>
                    </div>
                    <Button className="mt-3" loading={signUpProcessing} onClick={callSignUp}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default SignUp;

import { useState } from 'react';
import Button from '../../common/Button';
import { InputText } from '../../common/InputElements';
import { createTask } from '../../../services/task';
import { useAppDispatch } from '../../../app/hooks';
import InputError from '../../../interface/inputError.interface';
import FormValidator from '../../../utils/formvalidator';
import { createTaskValidation } from './validation';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';

interface Props {
    onSuccess: () => void;
}

const CreateTask = (props: Props) => {
    const { onSuccess } = props;

    const [createTaskProcessing, setCreateTaskProcessing] = useState(false);
    const [failedMessage, setFailedMessage] = useState('');

    const dispatch = useAppDispatch();

    const [fieldErrors, setFieldErrors] = useState<InputError[]>([]);
    const [state, modifyState] = useState({
        name: '',
        dateTime: ''
    });

    const setState = (newState: object) => {
        modifyState({
            ...state,
            ...newState
        });
    };

    const callCreateTask = async (event: any) => {
        event.preventDefault();
        let submitCreateTask = new FormValidator(createTaskValidation());

        submitCreateTask.validateSubmit(state, async (valid: boolean, validationErrors: []) => {
            if (valid) {
                setCreateTaskProcessing(true);
                try {
                    const params = {
                        note: state.name,
                        datetime: state.dateTime
                    };
                    let response: any = await dispatch(createTask(params));

                    if (response.type === 'task/create/fulfilled') {
                        setCreateTaskProcessing(false);
                        setState({
                            note: '',
                            dateTime: ''
                        });
                        onSuccess();
                    }
                    if (response.type === 'task/create/rejected') {
                        setCreateTaskProcessing(false);
                    }
                } catch (error) {
                    setCreateTaskProcessing(false);
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

    const onChangeDate = (date: any) => {
        setState({
            dateTime: date[0]
        });
    };

    return (
        <div className="flex justify-center items-center mb">
            <div className="flex flex-col w-full ">
                {failedMessage !== '' && <div className="text-xs text-red-600 ml-2 mb-3 text-center">{failedMessage}</div>}
                <form onSubmit={callCreateTask} className="flex flex-col">
                    <InputText name="name" className="mb-2" placeholder="Note" value={state.name} onChange={handleChange} errors={fieldErrors} />

                    <Flatpickr
                        data-enable-time
                        value={state.dateTime}
                        className="p-3 border border-slate-200 text-sm"
                        onChange={(date) => onChangeDate(date)}
                        placeholder="Choose date and time"
                    />

                    <Button className="mt-3" loading={createTaskProcessing} onClick={callCreateTask}>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default CreateTask;

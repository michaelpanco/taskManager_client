import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import { InputText } from '../../common/InputElements';
import { updateTask, retrieveTask } from '../../../services/task';
import { useAppDispatch } from '../../../app/hooks';
import InputError from '../../../interface/inputError.interface';
import FormValidator from '../../../utils/formvalidator';
import { createTaskValidation } from './validation';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';

interface Props {
    id: string;
    onSuccess: () => void;
}

const UpdateTask = (props: Props) => {
    const { id, onSuccess } = props;

    const [updateTaskProcessing, setUpdateTaskProcessing] = useState(false);
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

    const callUpdateTask = async (event: any) => {
        event.preventDefault();
        let submitCreateTask = new FormValidator(createTaskValidation());

        submitCreateTask.validateSubmit(state, async (valid: boolean, validationErrors: []) => {
            if (valid) {
                setUpdateTaskProcessing(true);
                try {
                    const params = {
                        id: id,
                        payload: {
                            note: state.name,
                            datetime: state.dateTime
                        }
                    };
                    let response: any = await dispatch(updateTask(params));

                    if (response.type === 'task/update/fulfilled') {
                        setUpdateTaskProcessing(false);
                        onSuccess();
                    }
                    if (response.type === 'task/update/rejected') {
                        setUpdateTaskProcessing(false);
                    }
                } catch (error) {
                    setUpdateTaskProcessing(false);
                }
            } else {
                setFieldErrors(validationErrors);
            }
        });
    };

    const callRetrieveTask = async (id: string) => {
        try {
            const params = {
                id: id
            };
            let response: any = await dispatch(retrieveTask(params));

            if (response.type === 'task/retrieve/fulfilled') {
                setState({
                    name: response.payload.data.note,
                    dateTime: response.payload.data.dateTime
                });
            }
            if (response.type === 'task/retrieve/rejected') {
                // execute this when there is an error retrieving the details
            }
        } catch (error) {}
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

    useEffect(() => {
        callRetrieveTask(id);
    }, [id]);

    return (
        <div className="flex justify-center items-center mb">
            <div className="flex flex-col w-full ">
                {failedMessage !== '' && <div className="text-xs text-red-600 ml-2 mb-3 text-center">{failedMessage}</div>}
                <form onSubmit={callUpdateTask} className="flex flex-col">
                    <InputText name="name" className="mb-2" placeholder="Note" value={state.name} onChange={handleChange} errors={fieldErrors} />

                    <Flatpickr
                        data-enable-time
                        value={state.dateTime}
                        className="p-3 border border-slate-200 text-sm"
                        onChange={(date) => onChangeDate(date)}
                        placeholder="Choose date and time"
                    />

                    <Button className="mt-3" loading={updateTaskProcessing} onClick={callUpdateTask}>
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default UpdateTask;

export const createTaskValidation = () => {
    return [
        {
            field: 'name',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required'
        },
        {
            field: 'dateTime',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required'
        }
    ];
};

export const signUpValidation = () => {
    return [
        {
            field: 'name',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required'
        },
        {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required'
        },
        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required'
        }
    ];
};

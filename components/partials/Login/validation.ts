export const signInValidation = () => {
    return [
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

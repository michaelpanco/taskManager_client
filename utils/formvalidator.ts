import validatorjs from 'validator';

interface validatorParamsInterface {
    field: string;
    method: string;
    validWhen: boolean;
    message: string;
}

interface validationInterface {
    field: string;
    error: string;
    isInvalid: boolean;
}

interface eventInterface {
    target: {
        value: string;
        name: string;
    };
}

class FormValidator {
    validations: object[];

    constructor(validations: validatorParamsInterface[]) {
        // validations is an array of validation rules specific to a form
        this.validations = validations;
    }

    validateField(event: any) {
        // start out assuming valid

        let validator: any = validatorjs;

        let fields: string[] = [];

        // for each validation rule
        this.validations.forEach((rule: any) => {
            // determine the field value, the method to invoke and optional args from
            // the rule definition
            if (event.target.value != null && rule.field == event.target.name) {
                const field_value = event.target.value.toString();
                const args = rule.args || [];

                //@ts-ignore
                const validation_method =
                    typeof rule.method === 'string'
                        ? validator[rule.method]
                        : rule.method;

                // call the validation_method with the current field value as the first
                // argument, any additional arguments, and the whole state as a final
                // argument.  If the result doesn't match the rule.validWhen property,
                // then modify the validation object for the field and set the isValid
                // field to false
                //@ts-ignore
                if (
                    validation_method(field_value, ...args, {}) !==
                    rule.validWhen
                ) {
                    fields.push(rule.message);
                }
            }
        });

        return { field: event.target.name, errors: fields };
    }

    validateSubmit(state: any, callback: Function) {
        // start out assuming valid
        let validation_obj = this.valid();
        var validator: any = validatorjs;

        let valid = true;

        // for each validation rule
        this.validations.forEach((rule: any) => {
            // determine the field value, the method to invoke and optional args from
            // the rule definition
            if (state[rule.field] != null) {
                const field_value = state[rule.field].toString();

                const args = rule.args || [];
                const validation_method =
                    typeof rule.method === 'string'
                        ? validator[rule.method]
                        : rule.method;

                // call the validation_method with the current field value as the first
                // argument, any additional arguments, and the whole state as a final
                // argument.  If the result doesn't match the rule.validWhen property,
                // then modify the validation object for the field and set the isValid
                // field to false

                if (
                    validation_method(field_value, ...args, state) !==
                    rule.validWhen
                ) {
                    validation_obj.push({
                        //@ts-ignore
                        field: rule.field,
                        //@ts-ignore
                        error: rule.message
                    });
                    //@ts-ignore
                    //validation_obj[rule.field].push(rule.message);
                    valid = false;
                }
            }
        });
        callback(valid, validation_obj);
    }

    valid() {
        return [];
    }
}

export default FormValidator;

import { logoutAndRedirect } from './logoutAndRedirect';

export const serviceError = (errorResponse: any) => {
    if (errorResponse.response.status === 401) {
        logoutAndRedirect();
    }
};

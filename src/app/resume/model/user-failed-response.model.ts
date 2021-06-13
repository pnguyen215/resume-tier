import { BlibsBaseModel } from 'ngx-blibs-api';

export interface UserFailedResponseModel extends BlibsBaseModel {
    code: number;
    status: boolean;
    message: string;
    errors: string[];
}


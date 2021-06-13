import { BlibsBaseModel } from 'ngx-blibs-api';

export interface UserRequest extends BlibsBaseModel {
    username: string;
    password: string;
}

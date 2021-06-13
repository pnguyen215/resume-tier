import { BlibsBaseModel } from 'ngx-blibs-api';

export interface UserSuccessResponseModel extends BlibsBaseModel {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
    scope?: string;
    code?: number;
    organization?: string;
    status: string;
}



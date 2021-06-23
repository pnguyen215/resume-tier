import { BlibsBaseModel } from 'ngx-blibs-api';

export interface JobsRequestModel extends BlibsBaseModel {
    company: string;
    jobsTitle: string;
    linkOfCompany?: string;
    locationOrAddressCompany?: string;
    salary?: number;
    description?: string;
    note?: string;
    linkLogoOfCompany?: string;
    jobsTrackingId: number;
}


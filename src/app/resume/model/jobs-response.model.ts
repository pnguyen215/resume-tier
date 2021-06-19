import { BlibsBaseModel } from 'ngx-blibs-api';

export interface JobsResponseModel extends BlibsBaseModel {
    company: string;
    jobsTitle: string;
    linkOfCompany: string;
    locationOrAddressCompany: string;
    salary: number;
    note?: string;
    linkLogoOfCompany: string;
    nameStatusJobAfterInterview: string;
    valueStatusJobAfterInterview: number;
    interviewTime: Date;
    interviewResponseTime: Date;
    startWorkingOn: Date;
    finishWorkOn: Date;
    startProbationaryPeriod: Date;
    endOfProbationaryPeriod: Date;
    durationInterviewedPeriod: string;
    durationProbationariesPeriod: string;
    durationWorkingOn: string;
    valueOfDurationInterviewedPeriod: number;
    valueOfDurationProbationariesPeriod: number;
    valueOfDurationWorkingOn: number;
    jobsTrackingId: number;
    likeStatus?: boolean;
}

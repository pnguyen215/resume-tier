import { BlibsBaseModel } from 'ngx-blibs-api';
import { JobsResponseModel } from './jobs-response.model';

export interface JobsTrackingResponseModel extends BlibsBaseModel {
    jobsTrackingIndex: number;
    name: string;
    size?: number;
    jobs: JobsResponseModel[];
}


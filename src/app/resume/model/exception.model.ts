
export interface ExceptionModel {
    code: number;
    hasError: boolean;
    status: ErrorStatus;
    messageError: string;
    description: string;
}

export enum ErrorStatus {
    INFO = 1,
    WARN = 2,
    SUCCESS = 3,
    ERROR = 4
}

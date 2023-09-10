export interface IReturnObject {
  error: boolean;
  errorMessage?: any;
  successMessage?: any;
  data?: any;
  trace?: any;
  statusCode: number;
}

export function Return(option: IReturnObject): IReturnObject {
  return {
    error: option.error,
    statusCode: option.statusCode,
    errorMessage: option.errorMessage || null,
    successMessage: option.successMessage || null,
    data: option.data || null,
    trace: option.trace || null,
  };
}

export enum Default {
  DEFAULT_PIN = 1234,
  DEFAULT_OTP = 1234
}
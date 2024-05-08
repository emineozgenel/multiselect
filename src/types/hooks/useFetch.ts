/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { TApiErrorResponse } from '../config';

export type TFetchData<T> = {
  loading: boolean;
  successed: boolean;
  error: AxiosError<TApiErrorResponse>;
  fetchData: (par?: T, callback?: () => void) => void;
  data: any;
  setData?: React.Dispatch<React.SetStateAction<any>>;
};

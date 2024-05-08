/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { requests } from 'config';
import { TApiErrorResponse, TApiFunc, TFetchData } from 'types';

export const useFetch = <T>(url: TApiFunc, params?: T, initial = true): TFetchData<T> => {
  const [loading, setLoading] = useState(false);
  const [successed, setSuccessed] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState({} as AxiosError<TApiErrorResponse>);

  const fetchData = async (newParameter?: any, callback = () => {}) => {
    if (!url) {
      return;
    }
    const parameter = newParameter || params;
    setSuccessed(false);
    setLoading(true);
    setError({} as AxiosError<TApiErrorResponse>);
    try {
      const { data } = await requests[url](parameter);
      setData(data);
      setSuccessed(true);
      callback();
    } catch (err: any) {
      setError(err);
      setSuccessed(false);
      setData(null);
      if (!err?.response) {
        toast.error('Error!');
      } else {
        const { error } = err.response.data;
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initial) fetchData();
  }, []);

  return { loading, data, fetchData, successed, error, setData };
};

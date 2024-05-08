export type TApiErrorResponse = {
  message: string | null;
  error: string;
  Data: null;
};

export type TGetApiParams = {
  name?: string;
};

export type TApiFunc = 'getCharacters';

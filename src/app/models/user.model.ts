export interface User {
    email: string;
    password: string;
    username?: string;
    id?: number;
}

export type DatabaseObjects = User;

export const customHttpMethods = {
    get: 'GET',
    getAll: 'GET_ALL',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
  };

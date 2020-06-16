import {Permission} from './permission.enum';

export class Employee {
    name: string;
    username: string;
    email: string;
    password: string;
    permission: Permission[];
}

import { TableActionType } from './table-action-type';

export interface TableEvent<T>{

    type: string;
    row?:T;

    payload?:any;

}
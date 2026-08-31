import { MatTableDataSource } from '@angular/material/table';

export class AppTableDataSource<T> extends MatTableDataSource<T>{

    constructor(data:T[]=[]){

        super(data);

    }

}
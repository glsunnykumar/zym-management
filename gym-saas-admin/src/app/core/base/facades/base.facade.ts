import { signal } from "@angular/core";

export abstract class BaseFacade<T>{

    readonly loading = signal(false);

    readonly items = signal<T[]>([]);

    readonly selected = signal<T | null>(null);

}
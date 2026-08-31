import { ToolbarOption } from "./toolbaroption.model";

export interface ToolbarFilter {

  key:string;

  label:string;

    value?:any;

  options:ToolbarOption[];

}
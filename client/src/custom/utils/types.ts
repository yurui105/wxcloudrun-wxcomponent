export interface IRequestMsg {
  url: string;
  method: "get" | "post" | "delete" | "put";
} 
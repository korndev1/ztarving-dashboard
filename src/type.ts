export interface responseApi {
    statusCode:number,
    message:string
}

export interface responseWithDataApi {
    statusCode:number,
    data:[]
}

export interface responseLoginApi {
    statusCode:number,
    message:string,
    access_token:string
}

export interface errorResponse {
    statusCode:number,
    message:string
}

export interface MeasureData {
    createAt: string;
    id:number;
    name: string;
    short_forn: string;
    updateAt: string;
  }
  
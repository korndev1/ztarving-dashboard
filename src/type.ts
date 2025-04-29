export interface responseApi {
    statusCode:number,
    message:string
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
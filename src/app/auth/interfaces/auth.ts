export interface AuthResponse {
    "status": number,
    "error": boolean,
    "message": string,
    "data": any
}

export interface Usuario {
    id?: number,
    nombre?: string,
    email?: string,
    role?: number,
    token?: string
}
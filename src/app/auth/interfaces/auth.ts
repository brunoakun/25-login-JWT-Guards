export interface AuthResponse {
    "status": number,
    "error": boolean,
    "mensaje": any,
    "data": any
} 

export interface Usuario {
    id?: number,
    nombre?: string,
    email?: string,
    role?: number
}
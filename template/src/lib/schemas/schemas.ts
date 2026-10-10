import {number, z} from "zod"

export const registerSchema = z.object({
    idUsuario:number(),
    apellidoPaterno:z.string().nonempty("el apellido paterno es obligatorio"),
    apellidoMaterno:z.string().nonempty("el apellido materno es obligatorio"),
    nombres:z.string().min(2,"el nombre debe tener al menos dos caracteres"),    
    dni:z.string().min(8,"el numero de digitos debe ser mayor a 8")
    .regex(/^\d+$/, "El DNI solo debe contener números"), 
})


export type RegisterFormData = z.infer<typeof registerSchema>


export const registerPatientSchema = z.object({
    apellidoPaterno:z.string().nonempty("el apellido paterno es obligatorio"),
    apellidoMaterno:z.string().optional(),
    nombres:z.string().optional()
})


export type RegisterPatientFormData = z.infer<typeof registerPatientSchema>



export const prestamoSchema = z.object({
    solicitadoPor:z.string().nonempty("Debes seleccionar a alguien")
})


export type RegisterPrestamoFormData = z.infer<typeof prestamoSchema>
import { Schema, model, models } from 'mongoose'

interface Client {
    name?: string
    agId: number
    ultimaDeuda?: string
    utlimoPeriodo?: string
    vtoUltimoPeriodo?: string
}

const ClientSchema = new Schema<Client>({
    name: { type: String },
    agId: { type: Number, required: true},
    ultimaDeuda: { type: String },
    utlimoPeriodo: { type: String },
    vtoUltimoPeriodo: { type: String }
    
})

export const ClientModel = models.Client || model<Client>('Client', ClientSchema)
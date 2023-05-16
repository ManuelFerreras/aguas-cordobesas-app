import { Schema, model, models } from 'mongoose'

export interface ClientInterface {
    name?: string
    agId: number
    ultimaDeuda?: string
    utlimoPeriodo?: string
    vtoUltimoPeriodo?: string
}

const ClientSchema = new Schema<ClientInterface>({
    name: { type: String },
    agId: { type: Number, required: true},
    ultimaDeuda: { type: String },
    utlimoPeriodo: { type: String },
    vtoUltimoPeriodo: { type: String }
})

export const ClientModel = models.Client || model<ClientInterface>('Client', ClientSchema)
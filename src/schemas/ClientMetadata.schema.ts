import { Schema, model, models } from "mongoose"


interface ClientMetadata {
    token: String
    agId: Number
}

const ClientMetadataSchema = new Schema<ClientMetadata>({
    token: { type: String, required: true },
    agId: { type: Number, required: true }
})

export const ClientMetadataModel = models.ClientMetadata || model<ClientMetadata>('ClientMetadata', ClientMetadataSchema)
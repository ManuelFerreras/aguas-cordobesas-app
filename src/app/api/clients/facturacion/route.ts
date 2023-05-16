import dbConnect from "@/lib/mongodb";
import { extractDataFromFactura, getClientFacturas, getClientToken } from "@/lib/utils/clientUtils";
import { ClientMetadataModel } from "@/schemas/ClientMetadata.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    console.log('POST')
    const reqBody = await req.json()

    const { agIds }: { agIds: number[] } = reqBody

    if (!agIds) return NextResponse.json({ error: 'No agIds' }, { status: 400 })

    agIds.forEach(async (agId) => {
        if (isNaN(Number(agId))) return NextResponse.json({ error: 'agId must be a number' }, { status: 400 })
        if (agId <= 0) return NextResponse.json({ error: 'agId must be greater than 0' }, { status: 400 })
    })

    await dbConnect()

    const getFacturasPromises = agIds.map(async (agId) => {
        const clientMetadataDBReq = await ClientMetadataModel.findOne({ agId: agId })
        let token = clientMetadataDBReq?.token

        if (!token) token = await getClientToken(agId)
        if (!token) return NextResponse.json({ error: `Invalid User Id ${agId}` }, { status: 400 })

        const clientFactura = await getClientFacturas(agId, token)
        if (!clientFactura) return NextResponse.json({ error: `Could not retrieve Factura from Client: ${agId}` }, { status: 400 })

        await extractDataFromFactura(clientFactura, agId)
    })

    await Promise.all(getFacturasPromises)

    return NextResponse.json({ status: 200 });
}

// export const POST = async (req: NextRequest) => {
//     const {agId, token} = await req.json()

//     const result = await getClientFacturas(agId, token)
//     return NextResponse.json({ result })
// }
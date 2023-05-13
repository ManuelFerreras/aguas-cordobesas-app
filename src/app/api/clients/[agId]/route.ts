import dbConnect from "@/lib/mongodb"
import { ClientModel } from "@/schemas/Client.schema"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest, res: NextResponse) {
    console.log('DELETE')
    await dbConnect()

    const agId = req.url.split('/').pop() // TODO: use URLPattern
    if (!agId) return NextResponse.json({ error: 'No agId' }, { status: 400 })

    const clientIdToDelete = agId
    if(isNaN(Number(clientIdToDelete))) return NextResponse.json({ error: 'agId must be a number' }, { status: 400 })
    if (Number(clientIdToDelete) <= 0) return NextResponse.json({ error: 'agId must be greater than 0' }, { status: 400 })

    const clientDelete = await ClientModel.findOneAndDelete({ agId: clientIdToDelete })

    return NextResponse.json({ clientDelete }, { status: 200 }) 
}
import dbConnect from '@/lib/mongodb';
import { ClientModel } from '@/schemas/Client.schema';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
    await dbConnect()
    console.log('POST')

    const reqBody = await req.json()
    console.log(reqBody)
    if (!reqBody?.agId) return NextResponse.json({ error: 'No agId' }, { status: 400 })

    const newClientId = reqBody?.agId
    if(isNaN(Number(newClientId))) return NextResponse.json({ error: 'agId must be a number' }, { status: 400 })
    if (newClientId <= 0) return NextResponse.json({ error: 'agId must be greater than 0' }, { status: 400 })

    // if client doesnt exist in db, add it.
    const clientExists = await ClientModel.findOne({ agId: newClientId })
    let clientToUpload = null
    if (!clientExists) {
        const newClient = new ClientModel({
            agId: newClientId
        })
        await newClient.save()
    }

    return NextResponse.json({ clientToUpload }, { status: 200 }) 
}

export async function GET() {
    await dbConnect()
    console.log('GET')

    const getResult = await ClientModel.find({})
    return NextResponse.json({ clients: getResult})
}

export async function DELETE(req: NextRequest) {
    console.log('DELETE')

    const { searchParams } = new URL(req.url)

    const agId = searchParams.get('agId')
    console.log('agId', agId)

    if(!agId) return NextResponse.json({ error: 'No agId' }, { status: 400 })
    if(isNaN(Number(agId))) return NextResponse.json({ error: 'agId must be a number' }, { status: 400 })
    if (Number(agId) <= 0) return NextResponse.json({ error: 'agId must be greater than 0' }, { status: 400 })

    await dbConnect()

    const clientDelete = await ClientModel.findOneAndDelete({ agId: agId })
    return NextResponse.json({ clientDelete }, { status: 200 }) 
}
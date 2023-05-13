import dbConnect from '@/lib/mongodb';
import { ClientModel } from '@/schemas/Client.schema';
import { NextResponse } from 'next/server'

export async function POST() {
    await dbConnect()
    console.log('POST')

    const clientToUpload = new ClientModel({
        agId: 1
    })

    await clientToUpload.save()

    return NextResponse.json({ message: 'User Created' }) 
}

export async function GET() {
    await dbConnect()
    console.log('GET')

    const getResult = await ClientModel.find({})
    return NextResponse.json({ clients: getResult})
}
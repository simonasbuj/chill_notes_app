import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

    const { title, content } = await request.json()
    console.log(await request.headers)

    try {
        await prisma.note.create({
            data: {
                title,
                content
            }
        })
        return NextResponse.json({ msg: "Note Created" });
    } catch (error) {
        return NextResponse.json({ error: 'SB error: ' + error }, { status: 503 })
    }
}

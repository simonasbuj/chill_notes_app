import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

    const { title, content } = await request.json()

    // Another Way:
    // const body = await request.json()
    // const { title, content } = body

    try {
        await prisma.note.create({
            data: {
                title,
                content
            }
        })
        return NextResponse.json({ msg: "success" });
    } catch (error) {
        return NextResponse.json({ error: 'SB error: ' + error }, { status: 503 })
    }
}

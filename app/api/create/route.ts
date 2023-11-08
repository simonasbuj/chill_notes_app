import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

    const { id, title, content } = await request.json()
    console.log("sb: " + id)

    try {
        await prisma.note.upsert({
            where: {
                id: Number(id)
              },
              update: {
                title: title,
                content: content
              },
              create: {
                title: title,
                content: content,
              }
        })
        return NextResponse.json({ msg: "Note Created" });
    } catch (error) {
        return NextResponse.json({ error: 'SB error: ' + error }, { status: 503 })
    }
}

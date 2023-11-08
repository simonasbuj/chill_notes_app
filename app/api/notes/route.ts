import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const notes = await prisma.note.findMany({
      orderBy: [
        {
          updatedAt: 'desc'
        }
      ],
    })

    // Convert BigInts to strings, cause apparently BigInts are not supported by JSON.stringify
    //  which is used behind the scenes when returning an array of objects
    const notesWithIdAsString = notes.map((note) => ({
        ...note,
        id: Number(note.id), // Convert id to string
      }));
      
    return NextResponse.json(notesWithIdAsString);
}

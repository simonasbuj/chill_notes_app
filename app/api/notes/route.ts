import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const notes = await prisma.note.findMany()
    // Convert BigInts to strings, cause apparently BigInts are not supported by JSON.stringify
    const notesWithIdAsString = notes.map((note) => ({
        ...note,
        id: Number(note.id), // Convert id to string
      }));
    return NextResponse.json(notesWithIdAsString);
}

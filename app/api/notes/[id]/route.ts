import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: {id: number}}) {
    const noteId = params.id
    console.log(request.method)

    const deletedNote = await prisma.note.delete({
        where: {
          id: noteId,
        },
    })

    return NextResponse.json({"message": `Note with id ${deletedNote.id} was deleted`});
}

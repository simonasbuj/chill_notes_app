'use client'

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { use } from "react";
import { prisma } from '../lib/prisma'

interface FormData {
  title: string
  content: string
  id: string
}

interface Note {
  id: number,
  title: string,
  content: string
}

export default function Home() {

  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})
  const [notes, setNotes] =  useState<Note[] | null>(null);
  const [addedNotes, setAddedNotes] = useState(0)

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {

        setNotes(data.slice().reverse())
      })
  }, [addedNotes])

  async function create(data: FormData) {
    try {
      fetch('/api/create', {
        body: JSON.stringify(data),
        "headers": {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then((res) => {
        setForm({title: '', content: '', id: ''})
        res.json().then((res) => { 
          console.log(res.msg) 
          setAddedNotes(addedNotes + 1)
        })
      })
    } catch (error) {
      console.log("create: " + error)
    }
  }

  return (
    <main>
      <div>
        <h1 className="text-center font-bold text-2xl m-4">Notes</h1>
        <form 
          onSubmit={ e => { 
              e.preventDefault() 
              create(form)
            }
          } 
          className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'
        >
          <input type="text"
            placeholder='Title'
            value={ form.title }
            onChange={e => setForm({...form, title: e.target.value }) }
            className='border-2 rounded border-gray-600 p-1'
          />
          <textarea
            placeholder='Note info'
            value={ form.content }
            onChange={e => setForm({...form, content: e.target.value }) }
            className='border-2 rounded border-gray-600 p-1'
          />
          <button 
            type='submit' 
            className='bg-blue-500 text-white font-bold rounded p-1 hover:bg-blue-600'
          >
            Add +
          </button>
        </form>
      </div>

      <div className='py-8 min-w-[25%] max-w-min mx-auto space-y-2'>
          {notes?.map(note => (
            <div 
              key={note.id}
              className='border-2 border-black rounded text-center hover:font-bold cursor-pointer hover:translate-x-4 transition-transform'
            >
              {note.title} | {note.content}
            </div>
          ))}
      </div>
      
    </main>
  )
}
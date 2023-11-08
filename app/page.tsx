'use client'

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FormData {
  title: string
  content: string
  id: string
}

export default function Home() {

  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})
  const [notes, setNotes] =  useState<FormData[] | null>(null);
  const [updatedNotes, setUpdatedNotes] = useState(0)

  useEffect(() => {

      fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data)
      })
      .catch(error => {console.log("Something broke while fethching from API, probably DB is down: " + error)})
    
  }, [updatedNotes])

  async function create(data: FormData) {
    try {
      fetch('/api/create', {
        body: JSON.stringify(data),
        "headers": {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then((res) => {

        const responseStatus = res.status

        res.json().then((res) => { 
          if (responseStatus == 200){
            setForm({title: '', content: '', id: ''})
            setUpdatedNotes(updatedNotes + 1)
            console.log(res.msg) 
          } else {
            console.log(res.error) 
          }
          
        })
      })
    } catch (error) {
      console.log("create: " + error)
    }
  }

  async function deleteNote(e: React.MouseEvent, id: number) {
    e.stopPropagation() // This make it so that parents' onClick doesnt get triggered
    try {
      fetch(`/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      }).then((res) => {
        res.json().then((res) => {
          console.log(res.message)
          setUpdatedNotes(updatedNotes + 1)
        })
      })
    } catch (error) {
      console.log("TRIED DELETING BUT GOT ERROR: " + error)
    }
  }

  return (
    <main>
      <div className='relative'>
        {form.id !== '' && (
        <div 
          onClick={() => setForm({title: '', content: '', id: ''})}
          className='absolute left-1/2 transform translate-x-36 top-4 hover:cursor-pointer hover:font-bold'
        >
          Cancel Edit
        </div>
        )}
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
              onClick={() => setForm({title: note.title, content: note.content, id: note.id})}
              className='group relative border-2 border-black rounded text-center hover:font-bold cursor-pointer hover:translate-x-4 transition-transform'
            >
              {note.title} | {note.content}
              <div 
                onClick={(e) => deleteNote(e, Number(note.id))} 
                className='
                  absolute 
                  top-1/2 
                  -translate-y-1/2
                  right-1 
                  hover:scale-150 
                  hover:text-red-600 
                  opacity-0 
                  invisible
                  group-hover:opacity-100 
                  group-hover:visible
                  transition-[opacity] 
                  duration-500'>x</div>
            </div>
          ))}
      </div>
      
    </main>
  )
}
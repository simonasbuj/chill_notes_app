'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FormData {
  title: string
  content: string
  id: string
}

export default function Home() {

  const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then((res) => {
        setForm({title: '', content: '', id: ''})
        res.json().then((res) => { console.log(res.error) })
      })
    } catch (error) {
      console.log("create: " + error)
    }
  }

  // why do we even need this? if we can just call create func
  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log("handleSubmit: " + error)
    }
  }


  return (
    <main className="ss">
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
    </main>
  )
}

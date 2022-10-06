import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'

// export default function Cards({ user }) {
export default function Cards() {
  const [cards, setCards] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    let { data: cards, error } = await supabase.from('cards').select('*').order('id', true)
    if (error) console.log('error', error)
    else setCards(cards)
  }
  const addCard = async (taskText) => {
    let task = taskText.trim()
    if (task.length) {
      let { data: card, error } = await supabase
        .from('cards')
        .insert({ task, user_id: user.id })
        .single()
      if (error) setError(error.message)
      else setCards([...cards, card])
    }
  }

  const deleteCard = async (id) => {
    try {
      await supabase.from('cards').delete().eq('id', id)
      setCards(cards.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Card List.</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setError('')
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" onClick={() => addCard(newTaskText)}>
          Add
        </button>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {cards.map((card) => (
            <Card key={card.id} card={card} onDelete={() => deleteCard(card.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Card = ({ card, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(card.is_complete)

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .update({ is_complete: !isCompleted })
        .eq('id', card.id)
        .single()
      if (error) {
        throw new Error(error)
      }
      setIsCompleted(data.is_complete)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <li
      onClick={(e) => {
        e.preventDefault()
        toggle()
      }}
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">{card.task}</div>
        </div>
        <div>
          {/* <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : ''}
          /> */}
          {card.title}
          <ul>

            <li>{card.note}</li>
            <li>{card.url}</li>
          </ul>
        </div>
        {/* <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
    </li>
  )
}

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
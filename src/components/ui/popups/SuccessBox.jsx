import React from 'react'

export default function SuccessBox({title, body}) {
  return (
    <div className='my-4 px-4 border-l-4 border-green-500 bg-green-500 bg-opacity-40'>
        <h3 className='font-bold'>{title}</h3>
        <p>{body}</p>
    </div>
  )
}

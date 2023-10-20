import React from 'react'

export default function FooterComponent() {
  return (
    <div className='dark:bg-neutral-950'>
        <div className='md:flex'>
          <div className='w-11/12 mb-2 m-2 mx-auto p-1 md:m-8 md:p-4 hover:bg-neutral-300 dark:hover:bg-neutral-800 md:w-1/3'>
        <h3 className='font-bold'>Used technologies</h3>
        <ol className='list-decimal list-inside'>
            <li>Tailwind</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
        </ol>
        </div>
        <div className='w-11/12 mb-2 m-2 mx-auto p-1 md:m-8 md:p-4 hover:bg-neutral-300 dark:hover:bg-neutral-800 md:w-1/3'>
          <h3 className='font-bold'>Credits</h3>
          <ul>
            <li><strong>Frontend development: </strong>Dmitriy Kostylev</li>
            <li><strong>Backend development: </strong>Dmitriy Kostylev</li>
          </ul>
        </div>
        <div className='w-11/12 mb-2 m-2 mx-auto p-1 md:m-8 md:p-4 hover:bg-neutral-300 dark:hover:bg-neutral-800 md:w-1/3'>
          <h3 className='font-bold'>Contacts</h3>
          <ul>
            <li><strong>VK: </strong><a href="https://vk.com/kustel666satan">Dmitriy Kostylev</a></li>
            <li><strong>Email: </strong>kustel666satan@gmail.com</li>
          </ul>
        </div>
        </div>
        
        <div className=' text-center text-sm'>All rights reserved, Kustel. 2023 - twice the time of universe thermal death</div>
    </div>
  )
}

import React from 'react'
import { notfound } from '../../images'

const NotFound = () => {
  return (
    <section className='w-full h-full'>
          <div className="w-full h-full">
            <img src={notfound} alt="notfound" className="w-screen h-screen"/>
          </div>
        </section>
  )
}

export default NotFound

import React from 'react'
import LoadingGif from '../images/loadd.gif'

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader__image">
            <img className='loading-gif' src={LoadingGif} alt="" />
        </div>
    </div>
  )
}

export default Loader
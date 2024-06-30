import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error_page'>
      <div className='center'>
        <Link to="/" className='btn primary'>Go back to Home Page</Link>
        <h2>Page Not Found</h2>
      </div>
    </section>
  )
}

export default ErrorPage
import React from 'react'

function Task({id , close, title, description}) {
  return (
    <>
        <h1>{id}</h1>
        <h2>{title}</h2>
        <p>{description}</p>

    </>
  )
}

export default Task
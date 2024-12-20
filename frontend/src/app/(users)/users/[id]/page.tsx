import React from 'react'

type Params = { id: string }

const UserPage = ({ params }: { params: Params }) => {
  return (
    <div>
      <h2>UserPage xxx {params.id}</h2>
    </div>
  )
}

export default UserPage

import React from 'react'

const UsersPage = async () => {
  const allUsers = await fetch('http://localhost:3200/user').then((value) =>
    value.json(),
  )
  console.log(allUsers)
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}
export default UsersPage

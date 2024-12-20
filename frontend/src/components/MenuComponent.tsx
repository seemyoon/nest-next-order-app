import Link from 'next/link'
import React from 'react'

const MenuComponent = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/users'}>Users</Link>
        </li>
        <li>
          <Link href={'/products'}>Products</Link>
        </li>
        <li>
          <Link href={'/orders'}>Orders</Link>
        </li>
      </ul>
    </div>
  )
}
export default MenuComponent

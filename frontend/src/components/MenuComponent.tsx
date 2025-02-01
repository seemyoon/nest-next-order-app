import Link from 'next/link'
import React from 'react'

const MenuComponent = () => {
  return (
    <div className="bg-primary-foreground p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link href={'/users'} className="text-gray-700 hover:text-gray-900">
            Users
          </Link>
        </li>
        <li>
          <Link
            href={'/products'}
            className="text-gray-700 hover:text-gray-900"
          >
            Products
          </Link>
        </li>
        <li>
          <Link href={'/orders'} className="text-gray-700 hover:text-gray-900">
            Orders
          </Link>
        </li>
        <li>
          <Link href={'/signin'} className="text-gray-700 hover:text-gray-900">
            Sign-in
          </Link>
        </li>
        <li>
          <Link href={'/signup'} className="text-gray-700 hover:text-gray-900">
            Sign-up
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MenuComponent

import { LinkItems } from '@/utils/types'
import Link from 'next/link'
import React from 'react'

export default function NavLink({ icon, title }: LinkItems) {
  return (
    <Link
      href="#"
      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  )
}

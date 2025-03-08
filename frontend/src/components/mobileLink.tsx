import { LinkItems } from '@/utils/types'
import Link from 'next/link'
import React from 'react'

export default function MobileNavLink({ icon, title }: LinkItems) {
  return (
    <Link
      href="#"
      className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  )
}

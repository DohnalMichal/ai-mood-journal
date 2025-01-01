import React from 'react'

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="px-5 py-2 cursor-pointer overflow-hidden rounded-xl bg-blue-500 text-gray-50 hover:bg-blue-600 transition-all"
    >
      {children}
    </button>
  )
}

export { Button }

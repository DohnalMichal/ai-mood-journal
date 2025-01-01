'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment, JSX, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((segment) => segment)

  const [dynamicLabels, setDynamicLabels] = useState<{ [key: string]: string }>(
    {},
  )

  useEffect(() => {
    const fetchLabels = async () => {
      const newLabels: { [key: string]: string } = {}

      // Example: If your path is /journal/[id], fetch the title for the [id]
      if (segments.length >= 2 && segments[0] === 'journal') {
        const id = segments[1]
        try {
          const response = await fetch(`/api/journal/${id}`)
          if (response.ok) {
            const data = await response.json()
            newLabels[id] = data.title
          } else {
            newLabels[id] = 'Unknown Entry'
          }
        } catch (error) {
          console.error('Error fetching breadcrumb label:', error)
          newLabels[id] = 'Unknown Entry'
        }
      }

      setDynamicLabels(newLabels)
    }

    fetchLabels()
  }, [pathname])

  console.log(dynamicLabels)

  // Build the breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1

    // Determine if this segment is a dynamic ID that needs a label
    let label: string | JSX.Element =
      segment.charAt(0).toUpperCase() + segment.slice(1) // Default label

    if (index === 1 && segments[0] === 'journal') {
      label = dynamicLabels[segment] || <Skeleton className="h-5 w-24" />
    }

    if (isLast) {
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbPage className="">{label}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    }

    return (
      <Fragment key={href}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </Fragment>
    )
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  )
}

export { Breadcrumbs }

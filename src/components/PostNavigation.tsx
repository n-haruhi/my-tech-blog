'use client'

import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import type { Post } from '@/lib/posts'

type PostNavigationProps = {
  previous: Post | null
  next: Post | null
}

export default function PostNavigation({ previous, next }: PostNavigationProps) {
  return (
    <nav className="border-t border-gray-200 mt-8 pt-8">
      <div className="flex justify-between">
        {/* 前の記事へのリンク */}
        <div className="flex-1 min-w-0 pr-4">
          {previous && (
            <Link 
              href={`/posts/${previous.slug}`}
              className="group block hover:text-blue-600"
            >
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                前の記事
              </div>
              <div className="text-base font-medium truncate">
                {previous.title}
              </div>
            </Link>
          )}
        </div>

        {/* 次の記事へのリンク */}
        <div className="flex-1 min-w-0 pl-4 text-right">
          {next && (
            <Link 
              href={`/posts/${next.slug}`}
              className="group block hover:text-blue-600"
            >
              <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
                次の記事
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </div>
              <div className="text-base font-medium truncate">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
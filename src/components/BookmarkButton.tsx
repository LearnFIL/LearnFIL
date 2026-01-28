"use client"

import { useEffect, useState } from "react"
import { isBookmarked, toggleBookmark } from "../lib/bookmarks"

type BookmarkButtonProps = {
  lessonId: string
}

export default function BookmarkButton({ lessonId }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    setBookmarked(isBookmarked(lessonId))
  }, [lessonId])

  const handleClick = () => {
    const next = toggleBookmark(lessonId)
    setBookmarked(next)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark lesson"}
      title={bookmarked ? "Remove bookmark" : "Bookmark lesson"}
      className="text-lg cursor-pointer"
    >
      {bookmarked ? "🔖" : "📑"}
    </button>
  )
}

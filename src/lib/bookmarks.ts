const BOOKMARK_KEY = "lesson_bookmarks"

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]")
  } catch {
    return []
  }
}

export function isBookmarked(lessonId: string): boolean {
  return getBookmarks().includes(lessonId)
}

export function toggleBookmark(lessonId: string): boolean {
  const bookmarks = getBookmarks()

  const updated = bookmarks.includes(lessonId)
    ? bookmarks.filter(id => id !== lessonId)
    : [...bookmarks, lessonId]

  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated))
  return updated.includes(lessonId)
}

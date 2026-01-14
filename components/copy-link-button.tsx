'use client'

interface CopyLinkButtonProps {
  url: string
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="btn-secondary whitespace-nowrap"
    >
      Copy Link
    </button>
  )
}

'use client'

interface StarRatingProps {
  rating: number
  count?: number
  size?: 'sm' | 'md'
}

export function StarRating({ rating, count, size = 'sm' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className={`flex items-center gap-1 ${textClass}`}>
      <div className="flex">
        {stars.map((filled, i) => (
          <span key={i} style={{ color: filled ? '#C6A45A' : '#E5E0D8' }}>★</span>
        ))}
      </div>
      <span className="text-[#6B6560]">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-[#9E9890]">· {count}</span>}
    </div>
  )
}

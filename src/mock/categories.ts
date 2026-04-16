export interface Category {
  id: string
  name: string
  slug: string
  emoji: string
  image: string  // Unsplash URL
}

export const categories: Category[] = [
  {
    id: '1', name: 'Вино', slug: 'wine', emoji: '🍷',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '2', name: 'Віскі', slug: 'whiskey', emoji: '🥃',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '3', name: 'Пиво', slug: 'beer', emoji: '🍺',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '4', name: 'Горілка', slug: 'vodka', emoji: '🍸',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '5', name: 'Шампанське', slug: 'champagne', emoji: '🥂',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '6', name: 'Коньяк', slug: 'cognac', emoji: '🍊',
    image: 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '7', name: 'Джин', slug: 'gin', emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=500&fit=crop&q=80',
  },
  {
    id: '8', name: 'Ром', slug: 'rum', emoji: '🍹',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=500&fit=crop&q=80',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export interface Banner {
  id: string
  image: string
  title: string
  subtitle: string
  cta: string
  href: string
}

export const banners: Banner[] = [
  {
    id: 'b1',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=1200&h=400&fit=crop',
    title: 'Найкращі ціни тижня на вина Франції',
    subtitle: 'Порівняйте ціни по магазинах і зекономте до 30%',
    cta: 'Переглянути товари →',
    href: '/catalog/wine',
  },
  {
    id: 'b2',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&h=400&fit=crop',
    title: 'Топ-10 віскі до 1000 ₴',
    subtitle: 'Додайте до списку та знайдіть де купити поруч',
    cta: 'Обрати віскі →',
    href: '/catalog/whiskey',
  },
  {
    id: 'b3',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&h=400&fit=crop',
    title: 'Крафтове пиво від українських пивоварень',
    subtitle: 'Знайдіть найкращу ціну серед 100+ магазинів',
    cta: 'Порівняти ціни →',
    href: '/catalog/beer',
  },
]

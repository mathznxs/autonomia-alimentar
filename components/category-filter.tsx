'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
  selectedCategory?: string
}

export function CategoryFilter({ categories, selectedCategory }: Props) {
  const router = useRouter()

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      router.push(`/cardapio?categoria=${slug}`)
    } else {
      router.push('/cardapio')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-olive">Filtrar por:</span>
      <button
        onClick={() => handleCategoryChange(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !selectedCategory
            ? 'bg-forest text-cream'
            : 'bg-cream text-forest hover:bg-forest/10'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-forest text-cream'
              : 'bg-cream text-forest hover:bg-forest/10'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

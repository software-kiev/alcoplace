export interface Offer {
  store_id: string
  product_id: string
  price: number
  availability: 'in_stock' | 'low_stock' | 'out_of_stock'
}

export const offers: Offer[] = [
  // p1 — Château Margaux
  { store_id: 's1', product_id: 'p1', price: 289, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p1', price: 349, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p1', price: 489, availability: 'low_stock' },
  { store_id: 's7', product_id: 'p1', price: 329, availability: 'in_stock' },
  // p2 — Sauvignon Blanc
  { store_id: 's2', product_id: 'p2', price: 449, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p2', price: 699, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p2', price: 529, availability: 'in_stock' },
  // p3 — Prosecco
  { store_id: 's1', product_id: 'p3', price: 229, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p3', price: 269, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p3', price: 249, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p3', price: 289, availability: 'low_stock' },
  { store_id: 's5', product_id: 'p3', price: 259, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p3', price: 249, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p3', price: 349, availability: 'in_stock' },
  // p4 — Rosé
  { store_id: 's2', product_id: 'p4', price: 549, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p4', price: 749, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p4', price: 599, availability: 'low_stock' },
  // p5 — Jameson
  { store_id: 's1', product_id: 'p5', price: 389, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p5', price: 429, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p5', price: 419, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p5', price: 449, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p5', price: 399, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p5', price: 489, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p5', price: 589, availability: 'low_stock' },
  // p6 — Jack Daniel's
  { store_id: 's1', product_id: 'p6', price: 449, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p6', price: 499, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p6', price: 469, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p6', price: 529, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p6', price: 489, availability: 'in_stock' },
  // p7 — Glenfiddich
  { store_id: 's2', product_id: 'p7', price: 749, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p7', price: 999, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p7', price: 849, availability: 'in_stock' },
  // p8 — Corona
  { store_id: 's1', product_id: 'p8', price: 39, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p8', price: 45, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p8', price: 42, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p8', price: 49, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p8', price: 44, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p8', price: 69, availability: 'in_stock' },
  // p9 — Hoegaarden
  { store_id: 's1', product_id: 'p9', price: 45, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p9', price: 52, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p9', price: 49, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p9', price: 55, availability: 'in_stock' },
  // p10 — Guinness
  { store_id: 's1', product_id: 'p10', price: 55, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p10', price: 65, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p10', price: 59, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p10', price: 89, availability: 'in_stock' },
  // p11 — Absolut
  { store_id: 's1', product_id: 'p11', price: 279, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p11', price: 319, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p11', price: 299, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p11', price: 339, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p11', price: 309, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p11', price: 449, availability: 'low_stock' },
  // p12 — Grey Goose
  { store_id: 's2', product_id: 'p12', price: 699, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p12', price: 949, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p12', price: 799, availability: 'in_stock' },
  // p13 — Moët
  { store_id: 's2', product_id: 'p13', price: 1299, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p13', price: 1799, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p13', price: 1449, availability: 'low_stock' },
  // p14 — Veuve Clicquot
  { store_id: 's6', product_id: 'p14', price: 1499, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p14', price: 1699, availability: 'in_stock' },
  // p15 — Hennessy
  { store_id: 's1', product_id: 'p15', price: 799, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p15', price: 899, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p15', price: 1149, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p15', price: 949, availability: 'in_stock' },
  // p16 — Rémy Martin
  { store_id: 's2', product_id: 'p16', price: 1099, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p16', price: 1499, availability: 'in_stock' },
  // p17 — Tanqueray
  { store_id: 's1', product_id: 'p17', price: 479, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p17', price: 549, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p17', price: 519, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p17', price: 599, availability: 'in_stock' },
  // p18 — Hendrick's
  { store_id: 's2', product_id: 'p18', price: 749, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p18', price: 999, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p18', price: 849, availability: 'low_stock' },
  // p19 — Bacardi
  { store_id: 's1', product_id: 'p19', price: 329, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p19', price: 379, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p19', price: 349, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p19', price: 399, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p19', price: 369, availability: 'in_stock' },
  // p20 — Captain Morgan
  { store_id: 's1', product_id: 'p20', price: 299, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p20', price: 349, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p20', price: 319, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p20', price: 369, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p20', price: 339, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p20', price: 459, availability: 'in_stock' },
  // p21-p30: spread across stores
  { store_id: 's1', product_id: 'p21', price: 399, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p21', price: 459, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p21', price: 599, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p22', price: 349, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p22', price: 519, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p22', price: 399, availability: 'in_stock' },
  { store_id: 's1', product_id: 'p23', price: 649, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p23', price: 729, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p23', price: 879, availability: 'low_stock' },
  { store_id: 's1', product_id: 'p24', price: 35, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p24', price: 42, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p24', price: 39, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p24', price: 45, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p24', price: 40, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p24', price: 59, availability: 'in_stock' },
  { store_id: 's1', product_id: 'p25', price: 169, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p25', price: 199, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p25', price: 189, availability: 'in_stock' },
  { store_id: 's4', product_id: 'p25', price: 209, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p25', price: 179, availability: 'in_stock' },
  { store_id: 's8', product_id: 'p25', price: 269, availability: 'in_stock' },
  { store_id: 's1', product_id: 'p26', price: 249, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p26', price: 299, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p26', price: 279, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p26', price: 289, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p26', price: 329, availability: 'in_stock' },
  { store_id: 's1', product_id: 'p27', price: 549, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p27', price: 629, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p27', price: 749, availability: 'in_stock' },
  { store_id: 's1', product_id: 'p28', price: 349, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p28', price: 419, availability: 'in_stock' },
  { store_id: 's3', product_id: 'p28', price: 389, availability: 'in_stock' },
  { store_id: 's5', product_id: 'p28', price: 399, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p29', price: 499, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p29', price: 729, availability: 'in_stock' },
  { store_id: 's7', product_id: 'p29', price: 579, availability: 'low_stock' },
  { store_id: 's1', product_id: 'p30', price: 649, availability: 'in_stock' },
  { store_id: 's2', product_id: 'p30', price: 749, availability: 'in_stock' },
  { store_id: 's6', product_id: 'p30', price: 899, availability: 'in_stock' },
]

export function getOffersForProduct(productId: string): Offer[] {
  return offers.filter((o) => o.product_id === productId)
}

export function getOffersForStore(storeId: string): Offer[] {
  return offers.filter((o) => o.store_id === storeId)
}

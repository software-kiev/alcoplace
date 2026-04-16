export interface Store {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  distance_km: number
}

export const stores: Store[] = [
  { id: 's1', name: 'АТБ', address: 'вул. Хрещатик, 22', lat: 50.4488, lng: 30.5222, distance_km: 0.5 },
  { id: 's2', name: 'Сільпо', address: 'вул. Саксаганського, 45', lat: 50.4380, lng: 30.5120, distance_km: 1.2 },
  { id: 's3', name: 'Наш Край', address: 'просп. Перемоги, 12', lat: 50.4560, lng: 30.4890, distance_km: 1.8 },
  { id: 's4', name: 'Фора', address: 'вул. Велика Васильківська, 100', lat: 50.4280, lng: 30.5200, distance_km: 2.3 },
  { id: 's5', name: 'Novus', address: 'просп. Голосіївський, 15', lat: 50.4200, lng: 30.5100, distance_km: 2.8 },
  { id: 's6', name: 'Good Wine', address: 'вул. Мечникова, 9', lat: 50.4420, lng: 30.5450, distance_km: 3.1 },
  { id: 's7', name: 'Wine Time', address: 'вул. Антоновича, 33', lat: 50.4350, lng: 30.5180, distance_km: 1.5 },
  { id: 's8', name: 'Мегамаркет', address: 'просп. Степана Бандери, 36', lat: 50.4700, lng: 30.5050, distance_km: 3.5 },
]

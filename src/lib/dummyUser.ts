import * as Crypto from "expo-crypto"

type Settings = {
  notifications: boolean
  theme: "light" | "dark" | "system"
  minCacheRange: number
  maxCacheRange: number
  discoveryMode: boolean
}

type User = {
  id: string
  email: string
  createdAt: Date
  displayName: string
  description: string
  avatar: string
  banner: string
  cachesVisited: number
  streak: number
  settings: Settings
  reviews: Review[]
  lists: List[]
}

type Cache = {
  id: string
  name: string
  description: string
  photos: string[]
  tags: string[]
  coordinates: { latitude: number; longitude: number }
  rating: number
  views: number
  reviews: Review[]
}

type Review = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: string
}

type List = {
  id: string
  name: string
  caches: Cache[]
  locked?: boolean
}

type Image = {
  uri: string
  mimeType: "image/jpeg" | "image/png" | "image/webp"
  fileSize: number
  height: number
  width: number
}

const dummyAvatarRaw: Image = {
  uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg",
  mimeType: "image/jpeg",
  fileSize: 80427,
  height: 1920,
  width: 1080,
}

const dummyBannerRaw: Image = {
  uri: "https://images.unsplash.com/photo-1636690424408-4330adc3e583?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mimeType: "image/jpeg",
  fileSize: 1369446,
  height: 6000,
  width: 4000,
}

// Storage bucket links
const dummyAvatar = "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg"
const dummyBanner =
  "https://images.unsplash.com/photo-1636690424408-4330adc3e583?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const dummyCachePhoto1 =
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600"
const dummyCachePhoto2 =
  "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600"
const dummyCachePhoto3 =
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"

const dummyReview: Review = {
  id: Crypto.randomUUID(),
  rating: 4,
  comment: "This is a very interesting comment.",
  createdAt: new Date("2023-01-01T00:00:00.000Z"),
  photo: dummyCachePhoto1,
}

const dummyCache: Cache = {
  id: Crypto.randomUUID(),
  name: "Cache 1",
  description: "This is a very interesting description of the cache.",
  photos: [dummyCachePhoto1, dummyCachePhoto2, dummyCachePhoto3],
  tags: ["Landscape", "Nature", "Scenic view"],
  coordinates: { latitude: 51.507351, longitude: -0.127758 },
  rating: 4,
  views: 10,
  reviews: [dummyReview, dummyReview, dummyReview],
}

const dummyCache2: Cache = {
  id: Crypto.randomUUID(),
  name: "Cache 2",
  description: "This is a very interesting description of the cache.",
  photos: [dummyCachePhoto2, dummyCachePhoto1, dummyCachePhoto3],
  tags: ["City"],
  coordinates: { latitude: 40.712776, longitude: -74.005974 },
  rating: 4,
  views: 100,
  reviews: [dummyReview, dummyReview, dummyReview],
}

const dummyCache3: Cache = {
  id: Crypto.randomUUID(),
  name: "Cache 3",
  description: "This is a very interesting description of the cache.",
  photos: [dummyCachePhoto3, dummyCachePhoto2, dummyCachePhoto1],
  tags: ["Park", "Nature", "Scenic view"],
  coordinates: { latitude: 35.689487, longitude: 139.691711 },
  rating: 3,
  views: 72,
  reviews: [dummyReview, dummyReview, dummyReview],
}

const dummyLists: List[] = [
  {
    id: Crypto.randomUUID(),
    name: "History",
    caches: [
      dummyCache,
      dummyCache2,
      dummyCache3,
      dummyCache,
      dummyCache2,
      dummyCache3,
      dummyCache,
      dummyCache2,
      dummyCache3,
      dummyCache,
      dummyCache2,
      dummyCache3,
    ],
    locked: true,
  },
  {
    id: Crypto.randomUUID(),
    name: "Reviews",
    caches: [
      dummyCache,
      dummyCache2,
      dummyCache3,
      dummyCache,
      dummyCache2,
      dummyCache3,
      dummyCache,
      dummyCache2,
      dummyCache3,
    ],
    locked: true,
  },
  {
    id: Crypto.randomUUID(),
    name: "Favorites",
    caches: [dummyCache, dummyCache2, dummyCache3, dummyCache, dummyCache2, dummyCache3],
  },
  {
    id: Crypto.randomUUID(),
    name: "Future journeys",
    caches: [dummyCache, dummyCache2, dummyCache3],
  },
]

const dummyUser: User = {
  id: "123", // Firebase user id
  email: "john.doe@example.com",
  createdAt: new Date("2023-01-01T00:00:00.000Z"),
  displayName: "John Doe",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non mattis lorem. Nam ornare scelerisque imperdiet.",
  avatar: dummyAvatar,
  banner: dummyBanner,
  settings: {
    notifications: true,
    theme: "system",
    minCacheRange: 0,
    maxCacheRange: 10,
    discoveryMode: false,
  },
  cachesVisited: 56,
  streak: 3,
  reviews: [dummyReview, dummyReview, dummyReview],
  lists: dummyLists,
}

export {
  dummyUser,
  dummyAvatar,
  dummyBanner,
  dummyCache,
  dummyReview,
  dummyLists,
  dummyAvatarRaw,
  dummyBannerRaw,
}
export type { User, Cache, Review, List, Image }

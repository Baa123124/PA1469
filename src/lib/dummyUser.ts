type Image = {
  uri: string
  mimeType: "image/jpeg" | "image/png" | "image/webp"
  fileSize: number
  height: number
  width: number
}

const dummyAvatar: Image = {
  uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg",
  mimeType: "image/jpeg",
  fileSize: 80427,
  height: 1920,
  width: 1080,
}

const dummyBanner: Image = {
  uri: "https://images.unsplash.com/photo-1636690424408-4330adc3e583?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mimeType: "image/jpeg",
  fileSize: 1369446,
  height: 6000,
  width: 4000,
}

type DummyUser = {
  id: string
  email: string
  createdAt: Date
  displayName: string
  description: string
  avatar: Image
  banner: Image
  notifications: boolean
  theme: "light" | "dark" | "system"
  minCacheRange: number
  maxCacheRange: number
  discoveryMode: boolean
  cachesVisited: number
  reviewsGiven: number
  streak: number
}

const dummyUser: DummyUser = {
  id: "123",
  email: "john.doe@example.com",
  createdAt: new Date("2023-01-01T00:00:00.000Z"),
  displayName: "John Doe",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non mattis lorem. Nam ornare scelerisque imperdiet.",
  avatar: dummyAvatar,
  banner: dummyBanner,
  notifications: true,
  theme: "system",
  minCacheRange: 0,
  maxCacheRange: 10,
  discoveryMode: false,
  cachesVisited: 56,
  reviewsGiven: 23,
  streak: 3,
}

type Cache = {
  id: string
  name: string
  description: string
  photos: Image[]
  tags: string[]
  coordinates: { latitude: number; longitude: number }
  rating: number
  timesVisited: number
}

const dummyCache: Cache = {
  id: "123",
  name: "Cache 1",
  description: "This is a very interesting description of the cache.",
  photos: [
    {
      uri: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
      mimeType: "image/webp",
      fileSize: 15966,
      height: 600,
      width: 400,
    },
    {
      uri: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
      mimeType: "image/jpeg",
      fileSize: 48623,
      height: 600,
      width: 386,
    },
    {
      uri: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
      mimeType: "image/jpeg",
      fileSize: 31152,
      height: 600,
      width: 400,
    },
  ],
  tags: ["Landscape", "Nature", "Scenic view"],
  coordinates: { latitude: 51.507351, longitude: -0.127758 },
  rating: 4,
  timesVisited: 10,
}

type Review = {
  id: string
  userId: DummyUser["id"]
  cacheId: Cache["id"]
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: Image
}

const dummyReview = {
  id: "123",
  userId: "123",
  cacheId: "123",
  rating: 4,
  comment: "This is a very interesting comment.",
  createdAt: new Date("2023-01-01T00:00:00.000Z"),
  photo: {
    uri: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600",
    mimeType: "image/jpeg",
    fileSize: 31152,
    height: 600,
    width: 400,
  },
}

type List = {
  id: string
  userId: DummyUser["id"]
  name: string
  cachesCount: number
  caches: Cache[]
}

const dummyList = {
  id: "123",
  userId: "123",
  name: "Favorites",
  cachesCount: 3,
  caches: [dummyCache, dummyCache, dummyCache],
}

export { dummyUser, dummyAvatar, dummyBanner, dummyCache, dummyReview, dummyList }
export type { DummyUser, Image, Cache, Review, List }

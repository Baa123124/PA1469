const dummyAvatar = {
  uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg",
  mimeType: "image/jpeg",
  fileSize: 80427,
  height: 1920,
  width: 1080,
}

const dummyBanner = {
  uri: "https://images.unsplash.com/photo-1636690424408-4330adc3e583?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mimeType: "image/jpeg",
  fileSize: 1369446,
  height: 6000,
  width: 4000,
}

const dummyUser: DummyUser = {
  email: "john.doe@example.com",
  displayName: "John Doe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  avatar: dummyAvatar,
  banner: dummyBanner,
  notifications: true,
  theme: "system",
  minCacheRange: 0,
  maxCacheRange: 10,
  discoveryMode: false,
}

type DummyUser = {
  email: string
  displayName: string
  description: string
  avatar: typeof dummyAvatar
  banner: typeof dummyBanner
  notifications: boolean
  theme: "light" | "dark" | "system"
  minCacheRange: number
  maxCacheRange: number
  discoveryMode: boolean
}

export { dummyUser, dummyAvatar, dummyBanner }
export type { DummyUser }

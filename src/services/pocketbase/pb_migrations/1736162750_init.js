/// <reference path="../pb_data/types.d.ts" />

// TODO: Add reviews, not sure how to reference (or specify) the id with pocketbase

const firebase_id = "0l2ZPfQiFoYC0q2XKHEBHvO1tZx1"
const dummyAvatar = "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg"
const dummyBanner =
  "https://images.unsplash.com/photo-1636690424408-4330adc3e583?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const dummyCachePhoto1 =
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600"
const dummyCachePhoto2 =
  "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600"
const dummyCachePhoto3 =
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"
const dummyCache1 = {
  coordinates: { latitude: 51.507351, longitude: -0.127758 },
  data: {
    creatorId: firebase_id,
    name: "Cache 1",
    description: "This is a very interesting description of the cache.",
    photos: [dummyCachePhoto1, dummyCachePhoto2, dummyCachePhoto3],
    rating: 4,
    views: 10,
    // reviews: [dummyReview4],
  },
}
const dummyCache2 = {
  coordinates: { latitude: 56.1592993, longitude: 14.8792046 },
  data: {
    creatorId: firebase_id,
    name: "Cache 2",
    description: "Yes, this is very interesting",
    photos: [dummyCachePhoto1, dummyCachePhoto2, dummyCachePhoto3],
    rating: 4,
    views: 10,
    // reviews: [],
  },
}
const dummyCache3 = {
  coordinates: { latitude: 62.918161, longitude: 18.643501 },
  data: {
    creatorId: firebase_id,
    name: "Cache 3",
    description: "This is a very interesting description of the cache.",
    photos: [dummyCachePhoto1, dummyCachePhoto2, dummyCachePhoto3],
    rating: 4,
    views: 10,
    // reviews: [dummyReview, dummyReview2, dummyReview3],
  },
}
const dummyLists = [
  {
    name: "History",
    caches: [
      dummyCache1,
      dummyCache2,
      dummyCache3,
      dummyCache1,
      dummyCache2,
      dummyCache3,
      dummyCache1,
      dummyCache2,
      dummyCache3,
      dummyCache1,
      dummyCache2,
      dummyCache3,
    ],
    locked: true,
  },
  {
    name: "Reviews",
    caches: [
      dummyCache1,
      dummyCache2,
      dummyCache3,
      dummyCache1,
      dummyCache2,
      dummyCache3,
      dummyCache1,
      dummyCache2,
      dummyCache3,
    ],
    locked: true,
  },
  {
    name: "My caches",
    caches: [dummyCache1, dummyCache2, dummyCache3, dummyCache1, dummyCache2, dummyCache3],
    locked: true,
  },
  {
    name: "Favorites",
    caches: [dummyCache1, dummyCache2, dummyCache3, dummyCache1, dummyCache2, dummyCache3],
  },
  {
    name: "Bookmarked",
    caches: [dummyCache1, dummyCache2, dummyCache3],
  },
]

migrate(
  (app) => {
    // add up queries...
    deleteCollections(app)

    // --------------------------
    // * --- Review collection ---
    // --------------------------
    const reviewCollection = new Collection({
      name: "reviews",
      type: "base",
      fields: [
        {
          name: "rating",
          type: "number",
          required: true,
        },
        {
          name: "comment",
          type: "text",
          required: true,
        },
        {
          name: "createdAt",
          type: "date",
          required: true,
        },
        {
          name: "photo",
          type: "url",
          required: true,
        },
        {
          name: "displayName",
          type: "text",
          required: true,
        },
      ],
    })
    app.save(reviewCollection)
    const reviewRecord1 = new Record(reviewCollection)
    reviewRecord1.set("rating", 5)
    reviewRecord1.set("comment", "This is a very interesting comment.")
    reviewRecord1.set("createdAt", new Date("2023-01-01T00:00:00.000Z"))
    reviewRecord1.set("photo", dummyCachePhoto1)
    reviewRecord1.set("displayName", "Stefan")
    app.save(reviewRecord1)
    const reviewRecord2 = new Record(reviewCollection)
    reviewRecord2.set("rating", 4)
    reviewRecord2.set("comment", "This is a very interesting comment.")
    reviewRecord2.set("createdAt", new Date("2023-01-01T00:00:00.000Z"))
    reviewRecord2.set("photo", dummyCachePhoto2)
    reviewRecord2.set("displayName", "Stefan")
    app.save(reviewRecord2)
    const reviewRecord3 = new Record(reviewCollection)
    reviewRecord3.set("rating", 3)
    reviewRecord3.set(
      "comment",
      "This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment.",
    )
    reviewRecord3.set("createdAt", new Date("2024-01-01T00:00:00.000Z"))
    reviewRecord3.set("photo", dummyCachePhoto3)
    reviewRecord3.set("displayName", "Stefan")
    app.save(reviewRecord3)
    const reviewRecord4 = new Record(reviewCollection)
    reviewRecord4.set("rating", 2)
    reviewRecord4.set(
      "comment",
      "This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment. This is a very interesting comment.",
    )
    reviewRecord4.set("createdAt", new Date("2024-01-01T00:00:00.000Z"))
    reviewRecord4.set("photo", dummyAvatar)
    reviewRecord4.set("displayName", "King Kong")
    app.save(reviewRecord4)

    // --------------------------
    // * --- User collection ---
    // --------------------------
    const userCollection = new Collection({
      name: "users",
      type: "base",
      fields: [
        {
          name: "firebase_id",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "banner",
          type: "url", // TODO: change to blob
          required: true,
        },
        {
          name: "cachesVisited",
          type: "number",
          required: true,
        },
        {
          name: "streak",
          type: "number",
          required: true,
        },
        {
          name: "settings",
          type: "json",
          required: true,
        },
        // {
        //   name: "reviews",
        //   type: "json",
        //   required: true,
        // },
        {
          name: "lists",
          type: "json",
          required: true,
        },
      ],
    })
    app.save(userCollection)
    const userRecord = new Record(userCollection)
    userRecord.set("firebase_id", firebase_id)
    userRecord.set(
      "description",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non mattis lorem. Nam ornare scelerisque imperdiet.",
    )
    userRecord.set("banner", dummyBanner)
    userRecord.set("cachesVisited", 56)
    userRecord.set("streak", 3)
    userRecord.set("settings", {
      notifications: true,
      theme: "system",
      minCacheRange: 0,
      maxCacheRange: 10,
      discoveryMode: true,
    })
    // userRecord.set("reviews", [])
    userRecord.set("lists", dummyLists)
    app.save(userRecord)

    // --------------------------
    // * --- Cache collection ---
    // --------------------------
    const cacheCollection = new Collection({
      name: "caches",
      type: "base",
      fields: [
        {
          name: "coordinates",
          type: "json",
          required: true,
        },
        {
          name: "data",
          type: "json",
          required: true,
        },
      ],
    })
    app.save(cacheCollection)
    const cacheRecord1 = new Record(cacheCollection)
    cacheRecord1.set("coordinates", dummyCache1.coordinates)
    cacheRecord1.set("data", dummyCache1.data)
    app.save(cacheRecord1)
    const cacheRecord2 = new Record(cacheCollection)
    cacheRecord2.set("coordinates", dummyCache2.coordinates)
    cacheRecord2.set("data", dummyCache2.data)
    app.save(cacheRecord2)
    const cacheRecord3 = new Record(cacheCollection)
    cacheRecord3.set("coordinates", dummyCache3.coordinates)
    cacheRecord3.set("data", dummyCache3.data)
    app.save(cacheRecord3)
  },
  (app) => {
    // add down queries...
    deleteCollections(app)
  },
)

function deleteCollections(app) {
  const collectionNames = ["reviews", "users", "caches"]

  for (const name of collectionNames) {
    try {
      const collection = app.findCollectionByNameOrId(name)
      if (collection) {
        app.delete(collection)
      }
    } catch (err) {
      console.warn(`Collection ${name} not found or already deleted`)
    }
  }
}

/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // add up queries...
    // TODO: Add actual data instead of "products"
    const collection = new Collection({
      name: "products",
      type: "base",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          options: {
            min: 2,
            max: 100,
          },
        },
        {
          name: "price",
          type: "number",
          required: true,
          options: {
            min: 0,
          },
        },
        {
          name: "description",
          type: "text",
          required: false,
        },
      ],
    })

    app.save(collection)
  },
  (app) => {
    // add down queries...
    const collection = app.findCollectionByNameOrId("products")
    if (collection) {
      app.delete(collection)
    }
  },
)

import { defineMiddlewares } from "@medusajs/framework/http"

export default defineMiddlewares({
  routes: [
    {
      // 👇 This matches the Medusa File Module upload route
      matcher: "/vendor/files*",
      bodyParser: false,
    },
  ],
})

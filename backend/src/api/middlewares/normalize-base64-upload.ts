import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

export function normalizeBase64Upload(
  req: MedusaRequest,
  _res: MedusaResponse,
  next: () => void
) {
  const body = req.body as any

  /**
   * Vendor panel sends:
   * {
   *   file: "data:image/png;base64,iVBORw0KGgoAAA..."
   * }
   */
  if (
    typeof body?.file === "string" &&
    body.file.startsWith("data:")
  ) {
    const match = body.file.match(/^data:(.+);base64,(.+)$/)

    if (!match) {
      throw new Error("Invalid base64 upload")
    }

    const [, mimeType, base64Data] = match

    // Convert base64 → binary
    body.file = {
      content: Buffer.from(base64Data, "base64"),
      mimeType,
    }
  }

  next()
}

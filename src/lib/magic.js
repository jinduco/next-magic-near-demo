import { Magic } from "magic-sdk"
import { NearExtension } from "@magic-ext/near"

const createMagic = (key) => {
  return typeof window !== "undefined" && new Magic(key)
}

export const magic = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
  {
    extensions: [
      new NearExtension({
        rpcUrl: "",
      }),
    ],
  }
)

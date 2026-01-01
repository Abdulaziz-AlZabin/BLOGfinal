import "@emotion/react"
import { Colors } from "src/styles/theme"

declare module "@emotion/react" {
  export interface Theme {
    scheme: "light" | "dark"
    colors: Colors
  }
}

declare module 'prismjs/components/prism-*.js';
declare module 'prismjs/prism';
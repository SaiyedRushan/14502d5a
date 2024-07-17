import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)

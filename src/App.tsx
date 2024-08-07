import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Products from './components/Products'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
    </QueryClientProvider>
  )
}

export default App


import './App.css'
import InfiniteScrollComp from './components/InfiniteScrollComp'

function App() {
  

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-8"> 
      <h1 class="text-5xl font-extrabold dark:text-white">Infinite Scroll<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">using Intersection Observer API</small></h1>
      <InfiniteScrollComp />
    </div>
    </>
  )
}

export default App

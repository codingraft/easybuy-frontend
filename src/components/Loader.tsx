// import { LoaderIcon } from "react-hot-toast"

const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  )
}
export default Loader

export const Skeleton = ({count=3}: {count?: number}) => {
  const skeleton = Array.from({length: count}).map((_, index) => {
    return <div key={index} className="bg-gray-300 h-6 w-3/4 rounded"></div>
  })
  return (
    <div className="animate-pulse space-y-4">
     {skeleton}
    </div>
  )
}
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search({ inputRef, handleSearch }) {


  return (
    <div className="flex bg-white border py-3 shadow-lg shadow-gray-200">
      <div className="flex flex-grow items-center justify-center">
        <form onSubmit={handleSearch} className="flex items-between border border-gray-300 shadow-sm bg-white h-10 px-1 rounded-lg">
            <input ref={inputRef} type="text" placeholder="Search Location" className="ml-3 text-sm focus:outline-none"/>
            <button type="submit" className="outline-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
            </button>
        </form>
      </div>
    </div>
  )
}

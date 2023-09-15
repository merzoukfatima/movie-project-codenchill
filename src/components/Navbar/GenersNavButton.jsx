import React, { useState, useEffect } from "react"
import { GenresApiUrl } from "@/Utility/API"

export default function GenresNavButton() {
  const [genres, setGenres] = useState([])
  const [showGenres, setShowGenres] = useState(false)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(GenresApiUrl, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDQ0MGFjM2E2NGQ3YTFjNzg2MGE4OWQ5OGU5YWIxMiIsInN1YiI6IjY1MDFkM2I0ZTBjYTdmMDBjYmViMTBjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sdb2YMTp6rF92nHwh7zxf2PmeXtSR_R32x6z1SE1VWw",
          },
        })
        const data = await res.json()
        setGenres(data.genres)
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    if (showGenres) {
      fetchGenres()
    }
  }, [showGenres])

  const toggleGenresDropdown = () => {
    setShowGenres(!showGenres)
  }

  return (
    <div className="relative inline-block text-left">
      <div className="group">
        <button
          onClick={toggleGenresDropdown}
          className="bg-transparent border-2 border-transparent rounded-md p-2 hover:border-blue-500 focus:outline-none"
        >
          Genres
        </button>
        {showGenres && (
          <ul className="absolute left-0 mt-2 space-y-1 bg-white border border-gray-300 max-h-48 overflow-y-auto">
            {genres.map((genre) => (
              <li key={genre.id}>
                <a
                  href={`/genre/${genre.id}`}
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  {genre.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

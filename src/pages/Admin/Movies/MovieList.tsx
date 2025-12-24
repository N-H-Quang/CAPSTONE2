import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import movieApi from "@/apis/movie.api";
import adminApi from "@/apis/admin.api";
import { toast } from "react-toastify";

function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: moviesData, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieApi.getMovieList(),
  });

  const deleteMovieMutation = useMutation({
    mutationFn: (maPhim: number) => adminApi.deleteMovie(maPhim),
    onSuccess: () => {
      toast.success("Movie deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { content?: string } } };
      toast.error(err?.response?.data?.content || "Failed to delete movie");
    },
  });

  const movies = moviesData?.data.content || [];

  const filteredMovies = movies.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Movie List</h1>
          <Link to="/admin/movies/add">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Movie
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies by name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.maPhim}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {movie.hot && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                      HOT
                    </span>
                  )}
                  {movie.dangChieu && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                      NOW SHOWING
                    </span>
                  )}
                  {movie.sapChieu && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                      COMING SOON
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                  {movie.tenPhim}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {movie.moTa}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {movie.danhGia}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/movies/edit/${movie.maPhim}`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${movie.tenPhim}"?`)) {
                        deleteMovieMutation.mutate(movie.maPhim);
                      }
                    }}
                    disabled={deleteMovieMutation.isPending}
                    className="bg-gray-700 hover:bg-gray-600 text-red-400 border-gray-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;

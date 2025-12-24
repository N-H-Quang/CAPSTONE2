import { LayoutDashboard, Film, Users, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import movieApi from "@/apis/movie.api";
import adminApi from "@/apis/admin.api";

function Dashboard() {
  const { data: moviesData } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieApi.getMovieList(),
  });

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminApi.getUserList(),
  });

  const movies = moviesData?.data.content || [];
  const users = usersData?.data.content || [];
  
  const activeMovies = movies.filter(m => m.dangChieu).length;
  const comingSoonMovies = movies.filter(m => m.sapChieu).length;

  const stats = [
    {
      title: "Total Movies",
      value: movies.length.toString(),
      icon: Film,
      color: "bg-blue-500",
      change: `${activeMovies} active`,
    },
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "bg-green-500",
      change: `${users.filter(u => u.maLoaiNguoiDung === 'QuanTri').length} admins`,
    },
    {
      title: "Coming Soon",
      value: comingSoonMovies.toString(),
      icon: Clock,
      color: "bg-purple-500",
      change: "movies",
    },
    {
      title: "Now Showing",
      value: activeMovies.toString(),
      icon: LayoutDashboard,
      color: "bg-orange-500",
      change: "movies",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Recent Movies</h2>
          <div className="space-y-4">
            {movies.slice(0, 5).map((movie) => (
              <div
                key={movie.maPhim}
                className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                    <img 
                      src={movie.hinhAnh} 
                      alt={movie.tenPhim}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{movie.tenPhim}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(movie.ngayKhoiChieu).toLocaleDateString()} • ⭐ {movie.danhGia}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {movie.hot && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                      HOT
                    </span>
                  )}
                  {movie.dangChieu && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                      NOW
                    </span>
                  )}
                  {movie.sapChieu && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      SOON
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

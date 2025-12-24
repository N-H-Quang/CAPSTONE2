import { useState } from "react";
import { Search, Plus, Edit, Trash2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import theaterApi from "@/apis/theater.api";
import ShowtimeDialog from "@/components/Admin/ShowtimeDialog";

function ShowTimes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: theatersData, isLoading } = useQuery({
    queryKey: ["theaters"],
    queryFn: () => theaterApi.getTheaterList(),
  });

  const theaters = theatersData?.data.content || [];

  const allShowtimes: any[] = [];
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const filteredShowTimes = allShowtimes.filter(
    (showtime) =>
      showtime.tenPhim?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.tenRap?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">ShowTime Management</h1>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add ShowTime
          </Button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by movie or cinema..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Movie
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Cinema System
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Cinema
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Seats
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredShowTimes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No showtimes found. Theater systems: {theaters.length}
                      <br />
                      <span className="text-sm">
                        {theaters.map(t => t.tenHeThongRap).join(", ")}
                      </span>
                    </td>
                  </tr>
                ) : (
                  filteredShowTimes.map((showtime) => {
                    const date = new Date(showtime.ngayChieuGioChieu);
                    const occupancyRate =
                      ((showtime.tongSoGhe - showtime.soGheTrong) /
                        showtime.tongSoGhe) *
                      100;

                    return (
                      <tr
                        key={showtime.maLichChieu}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 text-white font-medium">
                          {showtime.tenPhim}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {showtime.tenCumRap}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {showtime.tenRap}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {showtime.giaVe?.toLocaleString()}đ
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-gray-300 text-sm">
                              {showtime.soGheTrong}/{showtime.tongSoGhe}
                            </span>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  occupancyRate > 80
                                    ? "bg-red-500"
                                    : occupancyRate > 50
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${occupancyRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

      <ShowtimeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTimes;

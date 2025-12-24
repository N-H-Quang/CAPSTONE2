import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog2";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminApi from "@/apis/admin.api";
import movieApi from "@/apis/movie.api";
import theaterApi from "@/apis/theater.api";
import { toast } from "react-toastify";

interface ShowtimeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ShowtimeDialog({ open, onOpenChange }: ShowtimeDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    giaVe: 75000,
  });
  
  const [maHeThongRap, setMaHeThongRap] = useState("");
  const [maCumRap, setMaCumRap] = useState("");

  const { data: moviesData } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieApi.getMovieList(),
  });

  const { data: theatersData } = useQuery({
    queryKey: ["theaters"],
    queryFn: () => theaterApi.getTheaterList(),
  });

  const { data: theaterDetailData } = useQuery({
    queryKey: ["theaterDetail", maHeThongRap],
    queryFn: () => theaterApi.getTheaterDetail(maHeThongRap),
    enabled: !!maHeThongRap,
  });

  const movies = moviesData?.data.content || [];
  const theaters = theatersData?.data.content || [];
  const cumRaps = theaterDetailData?.data.content || [];

  const mutation = useMutation({
    mutationFn: (data: {
      maPhim: number;
      ngayChieuGioChieu: string;
      maRap: string;
      giaVe: number;
    }) => adminApi.createShowtime(data),
    onSuccess: () => {
      toast.success("Showtime created successfully!");
      queryClient.invalidateQueries({ queryKey: ["showtimes"] });
      onOpenChange(false);
      setFormData({
        maPhim: "",
        ngayChieuGioChieu: "",
        giaVe: 75000,
      });
      setMaHeThongRap("");
      setMaCumRap("");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { content?: string } } };
      toast.error(err?.response?.data?.content || "Failed to create showtime");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTimeValue = formData.ngayChieuGioChieu;
    const date = new Date(dateTimeValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    mutation.mutate({
      maPhim: Number(formData.maPhim),
      ngayChieuGioChieu: formattedDateTime,
      maRap: maCumRap,
      giaVe: Number(formData.giaVe),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Showtime</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Movie *
            </label>
            <select
              name="maPhim"
              value={formData.maPhim}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.maPhim} value={movie.maPhim}>
                  {movie.tenPhim}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Theater System *
            </label>
            <select
              name="maHeThongRap"
              value={maHeThongRap}
              onChange={(e) => {
                setMaHeThongRap(e.target.value);
                setMaCumRap("");
              }}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Theater System</option>
              {theaters.map((theater) => (
                <option key={theater.maHeThongRap} value={theater.maHeThongRap}>
                  {theater.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Cinema Complex *
            </label>
            <select
              name="maCumRap"
              value={maCumRap}
              onChange={(e) => {
                setMaCumRap(e.target.value);
              }}
              required
              disabled={!maHeThongRap}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">Select Cinema Complex</option>
              {cumRaps.map((cumRap) => (
                <option key={cumRap.maCumRap} value={cumRap.maCumRap}>
                  {cumRap.tenCumRap}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Showtime *
            </label>
            <input
              type="datetime-local"
              name="ngayChieuGioChieu"
              value={formData.ngayChieuGioChieu}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Price (VND) *
            </label>
            <input
              type="number"
              name="giaVe"
              value={formData.giaVe}
              onChange={handleChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ShowtimeDialog;

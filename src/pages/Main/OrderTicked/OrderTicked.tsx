import { Seat } from "@/@type/movie.type";
import { LoaiGhe } from "@/@type/response.type";
import movieApi from "@/apis/movie.api";
import OrderBookingSummary from "@/components/OrderBookingSummary";
import OrderLegend from "@/components/OrderLegend";
import OrderMovieHeader from "@/components/OrderMovieHeader";
import OrderMovieScreen from "@/components/OrderMovieScreen";
import OrderSeatGrid from "@/components/OrderSeatGrid/OrderSeatGrid";
import { useCountdown } from "@/hooks/useCountdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function OrderTicked() {
  const params = useParams<{ maLichChieu: string }>();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const countdown = useCountdown(15, 0);
    const queryClient = useQueryClient()

  const { data: bookingData } = useQuery({
    queryKey: ["lichChieuDetail", params.maLichChieu],
    queryFn: () => {
      if (!params.maLichChieu) return Promise.reject("No movie ID");
      return movieApi.getQuanLyDatVe(params.maLichChieu);
    },
    enabled: !!params.maLichChieu,
    staleTime: 1000 * 60 * 5,
  });

  const orderTicketsMutation = useMutation({
    mutationFn: (data: {
      maLichChieu: number;
      danhSachVe: { maGhe: number; giaVe: number }[];
    }) => movieApi.orderTickets(data),
  });

  const seats = useMemo<Seat[]>(() => {
    if (!bookingData) return [];

    return bookingData.data.content.danhSachGhe.map((ghe) => {
      const isSelected = selectedSeatIds.includes(ghe.tenGhe);
      let status: Seat["status"];

      if (ghe.daDat) {
        status = "booked";
      } else if (isSelected) {
        status = "selected";
      } else if (ghe.loaiGhe === LoaiGhe.Vip) {
        status = "vip";
      } else {
        status = "available";
      }

      return {
        id: ghe.tenGhe,
        row: ghe.tenGhe.charAt(0),
        number: parseInt(ghe.tenGhe.substring(1)),
        status,
      };
    });
  }, [bookingData, selectedSeatIds]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === "booked") return;

    setSelectedSeatIds((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const total = useMemo(() => {
    if (!bookingData) return 0;
    return selectedSeatIds.reduce((sum, seatId) => {
      const ghe = bookingData.data.content.danhSachGhe.find(
        (g) => g.tenGhe === seatId
      );
      return sum + (ghe?.giaVe || 0);
    }, 0);
  }, [bookingData, selectedSeatIds]);

  const handleBooking = () => {
    if (selectedSeatIds.length > 0) {
     orderTicketsMutation.mutate({
        maLichChieu: Number(params.maLichChieu),
        danhSachVe: selectedSeatIds.map((seatId) => {
          const ghe = bookingData?.data.content.danhSachGhe.find(
            (g) => g.tenGhe === seatId
          );
          return { maGhe: ghe!.maGhe,
            giaVe: ghe!.giaVe,
          };
        }),
      },{
        onSuccess: () => {
          toast.success("Booking successful!");
          setSelectedSeatIds([]);
          queryClient.invalidateQueries({ queryKey: ["lichChieuDetail", params.maLichChieu] });
        }
      });
    }
  };

  const thongTinPhim = bookingData?.data.content.thongTinPhim;

  if (!bookingData || !thongTinPhim) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-[600px] bg-[url(https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmF0bWFufGVufDB8fDB8fHww)] bg-no-repeat bg-center bg-cover relative z-0 pt-20">
      <div className="container">
        <OrderMovieHeader
          date={`${thongTinPhim.ngayChieu} - ${thongTinPhim.gioChieu}`}
          screen={thongTinPhim.tenRap}
          countdown={countdown}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OrderMovieScreen />
              <OrderSeatGrid seats={seats} onSeatClick={handleSeatClick} />
              <OrderLegend />
            </div>

            <div className="lg:col-span-1">
              <OrderBookingSummary
                movieTitle={thongTinPhim.tenPhim}
                showtime={thongTinPhim.gioChieu}
                date={thongTinPhim.ngayChieu}
                cinema={thongTinPhim.tenCumRap}
                screen={thongTinPhim.tenRap}
                selectedSeats={selectedSeatIds}
                priceInfo={`${selectedSeatIds.join(", ")}${selectedSeatIds.length > 0 ? ` - ${total.toLocaleString()}` : ""}`}
                discount={0}
                total={total}
                onBooking={handleBooking}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTicked;

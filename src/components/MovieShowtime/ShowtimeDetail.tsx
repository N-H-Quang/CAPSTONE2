import { CumRapWithShowtimes } from "@/@type/model.type";
import { Link } from "react-router-dom";

interface ShowtimeDetailProps {
  cumRapList: CumRapWithShowtimes[];
}

export default function ShowtimeDetail({ cumRapList }: ShowtimeDetailProps) {
  return (
    <div>
      {(!cumRapList || cumRapList.length === 0) && (
        <div className="text-sm text-gray-500">
          No showtimes available. Please select a theater and date.
        </div>
      )}

      {cumRapList.map((cum) => {
        const timesToDisplay = cum.showtimes && cum.showtimes.length > 0 ? cum.showtimes : [];
        
        return (
          <div key={cum.maCumRap} className="py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-16 h-12 bg-gray-200 rounded-md shrink-0" />
              <div className="flex-1">
                <div>
                  <div className="font-semibold text-sm">{cum.tenCumRap}</div>
                  <div className="text-xs text-gray-500">{cum.diaChi}</div>
                </div>

                <div className="mt-3 flex gap-2 md:flex-wrap overflow-x-auto md:overflow-visible pb-2">
                  {timesToDisplay.length > 0 ? (
                    timesToDisplay.map((t) => (
                      <Link 
                        to={`/order/${t.maLichChieu}`}
                        key={t.maLichChieu}
                        className="bg-white px-3 py-2 rounded-md shadow-sm text-xs md:text-sm border border-gray-200 whitespace-nowrap shrink-0 hover:bg-indigo-50 hover:border-indigo-600 transition-colors"
                      >
                        {t.hour}
                      </Link>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">No showtimes available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import VideoDialog from "@/components/VideoDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import movieApi from "@/apis/movie.api";
import { useQuery } from "@tanstack/react-query";


function ComingSoon() {
    const { data: movies } = useQuery({
    queryKey: ["movies"],
    queryFn: movieApi.getMovieList,
    staleTime: 1000 * 60 * 5,
  });

  const newestMovie = movies?.data.content.find((movie) => movie.dangChieu);

  const commingSoonMovies = movies?.data.content.filter((movie) => !movie.dangChieu);

  return (
    <div
     className="bg-black min-h-[600px] bg-no-repeat bg-center bg-cover relative z-0"
      style={{
        backgroundImage: `url(${newestMovie?.hinhAnh || ""})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-10"></div>
      <div className="relative py-4 z-100 text-white container">
        <h2
          className="
    text-white text-xl font-semibold mt-4 relative inline-block
    after:content-[''] after:block after:w-full after:h-[2px] 
    after:bg-white/20 after:mt-2 mb-4
  "
        >
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-2">
            <div className="flex gap-2 mb-6">
              <Badge variant="destructive" className="uppercase">
                Destructive
              </Badge>
              <Badge variant="destructive" className="uppercase">
                Destructive
              </Badge>
            </div>
            <h2 className="text-5xl mb-2">{newestMovie?.tenPhim}</h2>
            <p className="mb-4">
              Release Date: {newestMovie?.ngayKhoiChieu
                ? new Date(newestMovie.ngayKhoiChieu).toLocaleDateString()
                : "TBA"}
            </p>
            <p className="mb-4 text-gray-300">
              {newestMovie?.moTa ||
                "No description available for this movie."}
            </p>
            <a href="#" className="text-blue-500 underline">
              More Info {`>`}
            </a>
          </div>
          <div className="mt-2">
            <div className="mb-4 text-sm text-gray-300 relative h-64 md:h-96">
              <img
                src={newestMovie?.hinhAnh || ""}
                alt={`${newestMovie?.tenPhim} Poster`}
                className="w-full rounded-lg shadow-lg object-cover h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoDialog
                  src="//www.youtube.com/embed/6WNIHgRIKWE?autoplay=1&rel=0"
                  triggerClassName="text-white w-16 h-16 md:w-20 md:h-20 animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-6 flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {commingSoonMovies?.slice(0, 5).map((movie, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <MovieCard
                    title={movie.tenPhim}
                    date={new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                    image={movie.hinhAnh}
                    id={movie.maPhim}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black" />
            <CarouselNext className="text-black" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;

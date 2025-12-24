import MovieCard from "@/components/MovieCard";
import FiltersBar from "@/components/FiltersBar";
import { useQuery } from "@tanstack/react-query";
import movieApi from "@/apis/movie.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

function ListMovie() {
  const { data: movies } = useQuery({
    queryKey: ["movies"],
    queryFn: movieApi.getMovieList,
    staleTime: 1000 * 60 * 5,
  });

  const splittedMovies = movies?.data.content.reduce((acc, movie, index) => {
    const chunkIndex = Math.floor(index / 8);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(movie);
    return acc;
  }, [] as (typeof movies.data.content)[]);

  return (
    <div className="bg-black bg-[url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)] bg-no-repeat bg-center bg-cover relative">
      <div className="container pt-4 pb-10 relative z-10">
        <div className="py-4 px-2">
          <div className="bg-white rounded-lg p-3">
            <FiltersBar movies={movies?.data.content || []} />
          </div>
        </div>
        <h2
          className="
    text-white text-xl font-semibold mt-4 relative inline-block
    after:content-[''] after:block after:w-full after:h-[2px] 
    after:bg-white/20 after:mt-2 mb-4
  "
        >
          Showing Movie
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {splittedMovies?.map((moviesChunk, index) => (
              <CarouselItem key={index} className="lg:basis-1/1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 rounded-lg px-2 bg-white/10">
                  {moviesChunk.map((movie) => (
                    <MovieCard
                      key={movie.maPhim}
                      title={movie.tenPhim}
                      image={movie.hinhAnh}
                      id={movie.maPhim}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
      <div className="absolute -bottom-[30px] left-0 w-full h-[60px] bg-gradient-to-b from-[#10181a2f]/0.7 to-[#8990964b]/0.7 shadow-lg"></div>
    </div>
  );
}

export default ListMovie;

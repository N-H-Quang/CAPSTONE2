import movieApi from "@/apis/movie.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import VideoDialog from "@/components/VideoDialog";
import { useQuery } from '@tanstack/react-query'
function Banner() {
  const {data:BannerList} = useQuery({
    queryKey: ["banners"],
    queryFn: movieApi.getBanners,
    staleTime: 1000 * 60 * 5, 
  });
  
  return (
    <Carousel className="w-full select-none">
      <CarouselContent className="-ml-1">
        {BannerList?.data.content.map((item, index) => (
          <CarouselItem key={index} className="pl-1">
            <div className="h-[240px] sm:h-[320px] md:h-[420px] lg:h-[500px] w-full overflow-hidden relative">
              <img
                src={`${item.hinhAnh}`}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="pointer-events-auto">
                  <VideoDialog
                    src="//www.youtube.com/embed/6WNIHgRIKWE?autoplay=1&rel=0"
                    triggerClassName="text-white w-16 h-16 md:w-20 md:h-20 animate-pulse"
                    ariaLabel="Play trailer"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Banner;

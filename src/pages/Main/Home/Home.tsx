import Banner from "@/components/Banner";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import ListMovie from "@/components/ListMovie";
import ShowTime from "@/components/ShowTime";

function Home() {
  return (
    <>
      <Banner></Banner>
      <ListMovie></ListMovie>
      <ComingSoon></ComingSoon>
      <ShowTime></ShowTime>
    </>
  );
}

export default Home;

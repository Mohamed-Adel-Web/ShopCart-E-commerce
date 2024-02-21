/** @format */

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Typography from "@mui/material/Typography";
import { Navigation } from "swiper/modules";
const bannerData: string[] = [
  "DOWNLOAD APP - FREE SHIPPING ON YOUR FIRST ORDER",
  " PAY WITH CREDIT CARD AND ENJOY EXTRA DISCOUNT",
  "FREE SHIPPING IN ORDER OVER 300 $",
];
export default function Banner() {
  const bannerList = bannerData.map((banner: string, index: number) => {
    return (
      <SwiperSlide style={{ background: "#004d40" }} key={index}>
        {banner}
      </SwiperSlide>
    );
  });
  return (
    <Typography sx={{ background: "#004d40" }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {bannerList}
      </Swiper>
    </Typography>
  );
}

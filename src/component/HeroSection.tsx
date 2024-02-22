/** @format */

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import CardMedia from "@mui/material/CardMedia";
import Clothes1 from "../../public/Image/clothes 1.jpg";
import Clothes2 from "../../public/Image/clothes 2.jpg";
import Clothes3 from "../../public/Image/clothes 3.jpg";
import Clothes4 from "../../public/Image/clothes 4.jpg";
import Clothes5 from "../../public/Image/clothes 5.jpg";
import Clothes6 from "../../public/Image/clothes 6.jpg";
import Electronic1 from "../../public/Image/ele 1.jpg";
import Electronic2 from "../../public/Image/ele 2.jpg";
import Electronic3 from "../../public/Image/ele 3.jpg";
import jewelry1 from "../../public/Image/jewellery 1.jpg";
import jewelry2 from "../../public/Image/jewellery 2.jpg";
import jewelry3 from "../../public/Image/jewellery 3.jpg";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
const image: string[] = [
  Clothes1,
  Clothes2,
  Clothes3,
  Clothes4,
  Clothes5,
  Clothes6,
  Electronic1,
  Electronic2,
  Electronic3,
  jewelry1,
  jewelry2,
  jewelry3,
];
const ImagesList = image.map((image) => {
  return (
    <SwiperSlide style={{ position: "relative" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{
          objectFit: { md: "contain", xs: "cover" },
          height: { xs: "280px", md: "600px" },
        }}
        image={image}
      />
    </SwiperSlide>
  );
});
export default function HeroSection() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {ImagesList}
      </Swiper>
    </>
  );
}

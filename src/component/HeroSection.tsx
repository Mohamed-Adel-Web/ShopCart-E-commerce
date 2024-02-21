/** @format */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default function HeroSection() {
  return (
    <>
      <Swiper
        spaceBetween={3}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{ width: "100vw" }}
            src={`../../public/image/black-and-white-2558273_1280.jpg`}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            style={{ width: "100vw" }}
            src={`../../public/Image/fashion-2591480_1280.jpg`}
            alt=""
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            style={{ width: "100vw" }}
            src={`../../public/Image/gold-3184582_1280.jpg`}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100vw" }}
            src={`../../public/Image/smart-watch-821557_1280.jpg`}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

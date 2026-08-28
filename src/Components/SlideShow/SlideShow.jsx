<<<<<<< HEAD
import React from "react";
import styles from "./SlideShow.module.css";
import MovieCard from "../MovieCard/MovieCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function SlideShow({ title, movies }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Row}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={12}
          slidesPerView={2.2}
          breakpoints={{
            480: { slidesPerView: 2.5, spaceBetween: 16 },
            768: { slidesPerView: 3.5, spaceBetween: 24 },
            1024: { slidesPerView: 4.8, spaceBetween: 40 },
            1440: { slidesPerView: 5.5, spaceBetween: 50 },
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideShow;
=======
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import styles from "./SlideShow.module.css";

export default function SlideShow({ title, movies }) {
  return (
    <div className={styles.slideShow}>
      <h2 className={styles.title}>{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={5.5}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
>>>>>>> 3155ef4 (Update Netflix clone)

// BannerSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      title: "CodeQuest Challenge 2025",
      description: "(A math-based assignment focused on puzzles, logic, or speed-solving)",
      image: "/Slider1.jpg"
    },
    {
      id: 2,
      title: "Math Marathon Mayhem",
      description: "(A tech-themed assignment on problem-solving or app building).",
      image: "/slider2.jpg"
    },
    {
      id: 3,
      title: "Eco-Innovators Project Fair",
      description: "(An environmental science or innovation-themed assignment)",
      image:"/slider3.jpeg"
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="h-[250px] md:h-[350px] bg-cover bg-center opacity-70 flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/50 p-6 rounded text-center">
              <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
              <p className="mt-3">{slide.description}</p>
              <button className="mt-4 bg-fuchsia-600 font-bold px-4 py-2 text-white hover:bg-green-600 rounded">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper'
import React from 'react'

SwiperCore.use([Pagination, Autoplay, Navigation])
export function SessionBanner() {
    return (
        <div className="">
            <Swiper
                spaceBetween={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                }}
            >
                <div className="w-full">
                    {IMAGE_BANNER.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className={`cursor-pointer`}>
                                <img src={item.link} className="w-full object-cover" key={index} />
                            </SwiperSlide>
                        )
                    })}
                </div>
            </Swiper>
        </div>
    )
}

const IMAGE_BANNER = [
    {
        link: 'https://salt.tikicdn.com/cache/w1080/ts/banner/7b/95/80/bf960f848881d6d297a1c6c400d96e85.jpg.webp',
    },
    {
        link: 'https://salt.tikicdn.com/cache/w1080/ts/banner/5b/ef/1f/78d4bdc51262b5107e9b6ef0d96a51e4.jpg.webp',
    },
]

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
                pagination={{
                    dynamicBullets: true,
                }}
            >
                <div className="w-full">
                    {IMAGE_BANNER.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className={`cursor-pointer`}>
                                <img src={item.link} className="w-full" key={index} />
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
        link: 'https://benhviencayanqua.vn/statics/banner1.jpg',
    },
    {
        link: 'https://benhviencayanqua.vn/statics/banner2.jpg',
    },
    {
        link: 'https://benhviencayanqua.vn/statics/banner3.jpg',
    },
]

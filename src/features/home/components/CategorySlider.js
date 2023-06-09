import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//swiper
import { FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from '../../../../node_modules/swiper/react/swiper-react'
import '../../../../node_modules/swiper/swiper-bundle.min.css'

//styles
import styles from './categorySlider.module.css'
import { MdOutlinePool } from 'react-icons/md'
import { FaMotorcycle } from 'react-icons/fa'
import { RiPrinterCloudLine } from 'react-icons/ri'
import { IoIosBicycle } from 'react-icons/io'

//media query
import useMediaQuery from '../../../hooks/useMediaQuery'

function CategorySlider() {
  const navigate = useNavigate()

  return (
    <div>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        autoHeight={true}
        slidesPerView={4}
        spaceBetween={15}
        className="mySwiper"
      >
        <SwiperSlide onClick={() => navigate('/driving-test')}>
          <div className={styles.itemContainer}>
            <FaMotorcycle />
            <p>Sát hạch</p>
          </div>
        </SwiperSlide>

        <SwiperSlide onClick={() => navigate('/photocopy')}>
          <div className={styles.itemContainer}>
            <RiPrinterCloudLine />
            <p>In ấn</p>
          </div>
        </SwiperSlide>

        <SwiperSlide onClick={() => navigate('/bicycles')}>
          <div className={styles.itemContainer}>
            <IoIosBicycle />
            <p>Xe đạp</p>
          </div>
        </SwiperSlide>

        <SwiperSlide onClick={() => navigate('/pool-info')}>
          <div className={styles.itemContainer}>
            <MdOutlinePool />
            <p>Hồ bơi</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default CategorySlider

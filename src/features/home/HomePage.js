import MainLayout from 'shared/layouts/MainLayout'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './homePage.module.css'
import useMediaQuery from 'hooks/useMediaQuery'
import HomeSlider from './components/HomeSlider'
import Logo from '../../shared/components/Logo'
import CategorySlider from './components/CategorySlider'
import HotSlider from './components/HotSlider'
import MainServices from './components/MainServices'
import Footer from '../../shared/components/Footer'

import styled from 'styled-components'

const HomePage = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <MainLayout className={styles.homeContainer}>
      {!isDesktop ? (
        <LogoContainer>
          <Logo />
          <div
            className={styles.searchIcon}
            onClick={() => alert('Xin lỗi, tính năng này đang được phát triển. Vui lòng quay lại sau!')}
          >
            <BiSearchAlt size={25} />
          </div>
        </LogoContainer>
      ) : null}

      <MainLayoutStyled isDesktop={isDesktop}>
        <div className={styles.homeSliderContainer}>
          <HomeSlider />
        </div>

        <div className={styles.categorySliderContainer}>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            Loại hình
          </p>
          <CategorySlider />
        </div>

        <div className={styles.hotSliderContainer}>
          <HotSlider />
        </div>

        <div className={styles.categorySliderContainer}>
          <MainServices />
        </div>

        <Footer />
      </MainLayoutStyled>
    </MainLayout>
  )
}

const MainLayoutStyled = styled.div`
  margin: ${props => (props.isDesktop === true ? '0 0%' : '0 15%')};
  ${
    '' /* width: 60%;
  margin: 0 auto; */
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default HomePage

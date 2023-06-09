// import axios from 'axios'
// import TitleBar from 'shared/components/TitleBar'
// import { useEffect, useState } from 'react'

// import QrReader from 'modern-react-qr-reader'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { selectUser } from 'store/userSlice'

// import { authHeader } from 'utils'
// import { BikeUserInfo, UploadCard } from './components'
// import styles from './styles.module.css'

// export function BicyclesPage() {
//   const navigate = useNavigate()
//   const user = useSelector(selectUser)
//   const [bicycleList, setBicycleList] = useState([])
//   const [bikeUser, setBikeUser] = useState(null)
//   const [scanner, setScanner] = useState(null)
//   const [scanned, setScanned] = useState(null)

//   useEffect(() => {
//     axios
//       .get('/api/bike-user', authHeader())
//       .then(res => {
//         if (res.data.length > 0) {
//           let bikeUserInfo = res.data[0]
//           bikeUserInfo.inTime = new Date(bikeUserInfo.inTime)

//           if (bikeUserInfo.outTime == null) {
//             bikeUserInfo.state = 0
//           } else {
//             bikeUserInfo.state = 1
//             bikeUserInfo.outTime = new Date(bikeUserInfo.outTime)

//             //calc total time used
//             const totalTime = bikeUserInfo.outTime.getTime() - bikeUserInfo.inTime.getTime()
//             const totalDates = Math.floor(totalTime / 86400000)
//             const totalHours = Math.floor(totalTime / 3600000)
//             const leftHours = totalHours - totalDates * 24
//             const leftMinutes = Math.floor(totalTime / 1000 / 60) - 60 * totalHours
//             bikeUserInfo.totalHours = leftHours
//             bikeUserInfo.totalMinutes = leftMinutes
//             bikeUserInfo.totalDates = totalDates

//             //calc total price
//             if (leftMinutes <= 15) {
//               bikeUserInfo.totalPrice = bikeUserInfo.totalHours * bikeUserInfo.bike.hourPrice
//             } else {
//               bikeUserInfo.totalPrice = (bikeUserInfo.totalHours + 1) * bikeUserInfo.bike.hourPrice
//             }

//             if (bikeUserInfo.totalPrice > bikeUserInfo.bike.dayPrice) {
//               const dayNum = bikeUserInfo.outTime.getDate() - bikeUserInfo.inTime.getDate() + 1

//               bikeUserInfo.totalPrice = bikeUserInfo.bike.dayPrice * dayNum
//             }

//             console.log(bikeUserInfo.totalPrice)
//           }
//           setBikeUser(bikeUserInfo)
//         }
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }, [])

//   useEffect(() => {
//     axios
//       .get('/api/bike')
//       .then(res => {
//         setBicycleList(res.data)
//       })
//       .catch(err => alert(err.toString()))
//   }, [])

//   const handleBicycleButtonClick = child => {
//     if (!child.isAvailable) {
//       return
//     }

//     navigate(`/bicycle?id=${child._id}`)
//   }

//   const handleReturnBikeButton = () => {
//     setScanner(true)
//   }

//   const handleError = error => {
//     console.log(error)
//     alert(
//       'Ứng dụng không có quyền truy cập camera. Vui lòng cấp quyền camera trên trình duyệt của bạn. Hoặc liên hệ: 0797324886 để được hỗ trợ nhanh nhất.'
//     )
//     navigate(0)
//   }

//   const onNewScanResult = data => {
//     if (data) {
//       setScanner(false)
//       setScanned(true)

//       axios
//         .patch('/api/bike-user', { bikeToken: data }, authHeader())
//         .then(res => {
//           if (res.status === 200) {
//             console.log(res.data)
//             alert('Bạn đã trả xe thành công!')
//             navigate(0)
//           }
//         })
//         .catch(err => {
//           alert(
//             'Đã có lỗi xảy ra. Vui lòng chụp màn hình lỗi gửi về zalo: 0797324886 để được hỗ trợ xử lý nhanh nhất! Lỗi: ' +
//               err.toString()
//           )
//         })
//     }
//   }

//   return (
//     <div className={styles.container}>
//       {/* <TitleBar title="Xe đạp công cộng" /> */}
//       <img src="/bicyclebanner.jpg" alt="banner" width={'100%'} />
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <p
//           style={{
//             fontWeight: 'bold',
//             color: 'red',
//             fontSize: '0.8rem',
//             textAlign: 'center',
//             margin: '0.5rem 0'
//           }}
//         >
//           Quan trọng cần làm trước khi đến điểm mượn
//         </p>
//         <p
//           style={{
//             color: 'var(--primary)',
//             fontSize: '0.8rem',
//             textAlign: '',
//             width: '90%',
//             margin: '0'
//           }}
//         >
//           Bước 1:
//           <br />
//           Cập nhật giấy tờ tùy thân
//           <br /> Bước 2:
//           <br />
//           Kiểm tra hoạt động Camera bằng cách:
//           <br />
//           - Chọn xe đạp và bấm Quét QR
//           <br />
//           - Cấp quyền camera cho ứng dụng
//           <br />
//           * Hướng dẫn khắc phục lỗi:
//           <br />- Không cập nhật được giấy tờ tùy thân (Lỗi 401): vui lòng đăng xuất tài khoản và đăng nhập lại để khắc
//           phục.
//           <br />- Không mở được camera: Cấp quyền camera cho ứng dụng trên trình duyệt đang sử dụng hoặc tải trình duyệt
//           Firefox về từ CH Play/App Store để truy cập vào website.
//           <br />- Liên hệ hỗ trợ kỹ thuật tại Zalo:{' '}
//           <a href="https://zalo.me/0797324886" target="_blank" rel="noopener noreferrer">
//             0797324886
//           </a>
//         </p>
//         <div className={styles.mapButtonContainer}>
//           <a
//             href={'https://goo.gl/maps/eJi16maY2xHtbTQFA'}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.mapButton}
//           >
//             Xem chỉ dẫn Google maps
//           </a>
//           <img src="/googlemap.png" />
//         </div>
//       </div>
//       {user.isLoggedIn ? (
//         <div className={styles.cardContainer}>
//           <BikeUserInfo />
//           <UploadCard />
//         </div>
//       ) : (
//         <div className={styles.loginContainer}>
//           <p>Đăng nhập để sử dụng tính năng này</p>
//           <button onClick={() => navigate('/login')} className={styles.loginButton}>
//             Đăng nhập
//           </button>
//         </div>
//       )}

//       {scanner ? (
//         <div className={styles.scanContainer}>
//           <QrReader
//             delay={100}
//             style={{ borderRadius: '5px' }}
//             onError={handleError}
//             onScan={onNewScanResult}
//             facingMode={'environment'}
//             legacyMode={false}
//           />
//         </div>
//       ) : (
//         <div>
//           {bikeUser ? (
//             // 2022-03-30T07:09:03.830+00:00
//             <div className={styles.bikeUserContainer}>
//               <h5>Thông tin thuê xe</h5>
//               <p className={styles.bikeName}>{bikeUser?.bike.name}</p>
//               <p>Ngày thuê: {bikeUser?.inTime.toLocaleDateString('en-GB')}</p>
//               <p>Thuê vào lúc: {bikeUser?.inTime.toLocaleTimeString('en-GB')}</p>
//               <p>Trả vào lúc: {bikeUser?.outTime ? bikeUser?.outTime.toLocaleTimeString('en-GB') : 'Chưa có'}</p>
//               {bikeUser?.outTime ? (
//                 <p>
//                   Đã dùng: {bikeUser?.totalDates} ngày {bikeUser?.totalHours} giờ {bikeUser?.totalMinutes} phút{' '}
//                 </p>
//               ) : null}

//               {bikeUser?.state == 0 ? (
//                 <p className={styles.bikeWaiting}>Chờ trả xe</p>
//               ) : (
//                 <p className={styles.bikeReturned}>Đã trả xe</p>
//               )}
//               {bikeUser?.state == 0 ? (
//                 <button onClick={handleReturnBikeButton} className={styles.loginButton}>
//                   Trả xe
//                 </button>
//               ) : null}
//               {bikeUser?.totalPrice ? <p>Tổng cộng: {bikeUser?.totalPrice} VNĐ</p> : null}
//             </div>
//           ) : (
//             <div className={styles.bikeUserContainer}>
//               <h5>Thông tin thuê xe</h5>
//               <p>Chưa có thông tin thuê xe</p>
//             </div>
//           )}
//         </div>
//       )}

//       <div className={styles.bicycleContainer}>
//         <h3 className={styles.header}>Chọn xe của bạn</h3>
//         <div className={styles.bicycleListContainer}>
//           {bicycleList.map(child => {
//             return (
//               <div
//                 key={child._id}
//                 className={styles.bicycleItem}
//                 onClick={() => handleBicycleButtonClick(child)}
//                 style={child.isAvailable ? null : { color: '#ccc', borderColor: '#ccc' }}
//               >
//                 <span>{child.name}</span>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

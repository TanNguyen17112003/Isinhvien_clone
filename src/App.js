import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { checkLogin, useScrollDirection } from "utils";
import AdminRoutes from "features/admin/AdminRoutes";
import PhotocopyRoutes from "features/photocopy/Routes";
import {
  AccountPage,
  AdminBicyclePage,
  AdminDrivingPage,
  AdminGuestHousePage,
  BankPage,
  BicyclePage,
  BicyclesPage,
  BusRegistrationPage,
  BusSurveyPage,
  CouponListPage,
  CouponPage,
  CouponScannedPage,
  DrivingInstructionPage,
  DrivingRegisterPage,
  DrivingInfoPage,
  ExplorePage,
  GuestHouseInfoPage,
  GuestHouseReportPage,
  GuestHouseUserPage,
  GuideDetailPage,
  GuidePage,
  HealthDetailPage,
  HealthPage,
  HomePage,
  JobDetailPage,
  JobPage,
  LoginPage,
  MaintainPage,
  NotFoundPage,
  PoolInfoPage,
  PoolTicketPage,
  PoolTutorPage,
  ProfilePage,
  QrScanPage,
  UniformRegistrationPage,
  SupportPage,
  B2InfoPage,
} from "features";

import useMediaQuery from "hooks/useMediaQuery";
import styled from "styled-components";
import TitleBar from "shared/components/TitleBar";

function SubPage({ pageTitle, navigationTo, navbarColor, renderComponent }) {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const scrollDirection = useScrollDirection();

  return (
    <div>
      <NavStyled status={scrollDirection}>
        <TitleBar
          title={pageTitle}
          navigation={navigationTo}
          backgroundColor={navbarColor}
        />
      </NavStyled>
      <LayoutStyled isTablet={isTablet}>{renderComponent}</LayoutStyled>
    </div>
  );
}

class App extends React.Component {
  render() {
    checkLogin();

    return (
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<MaintainPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guest-house" element={<GuestHouseInfoPage />} />
          <Route path="/guest-house-user" element={<GuestHouseUserPage />} />
          <Route
            path="/guest-house-report"
            element={<GuestHouseReportPage />}
          />
          <Route
            path="/guest-house-admin"
            element={
              <RequireAdminAuth>
                <AdminGuestHousePage />
              </RequireAdminAuth>
            }
          />

          <Route
            path="/pool-info"
            element={
              <SubPage
                pageTitle="Hồ bơi"
                navigationTo="/pool-info"
                renderComponent=<PoolInfoPage />
              />
            }
          />
          <Route
            path="/pool-ticket"
            element={
              <SubPage
                pageTitle="Mua vé tháng"
                navigationTo="/pool-ticket"
                renderComponent=<PoolTicketPage />
              />
            }
          />
          <Route
            path="/pool-tutor"
            element={
              <SubPage
                pageTitle="Đăng ký học bơi"
                navigationTo="/pool-tutor"
                renderComponent=<PoolTutorPage />
              />
            }
          />

          <Route path="/qrscan" element={<QrScanPage />} />
          <Route path="/guest-house-info" element={<GuestHouseInfoPage />} />

          <Route path="/driving-test" element={<DrivingInfoPage />} />
          <Route
            path="/driving-registration"
            element={<DrivingRegisterPage />}
          />
          <Route
            path="/driving-instruction"
            element={<DrivingInstructionPage />}
          />
          <Route path="/driving-license" element={<B2InfoPage />}>
            <Route path="b2" element={<B2InfoPage />} />
          </Route>

          <Route path="/jobs" element={<JobPage />} />
          <Route path="/job" element={<JobDetailPage />} />

          <Route path="/coupon-list" element={<CouponListPage />} />
          <Route path="/coupon" element={<CouponPage />} />
          <Route path="/coupon-scanned" element={<CouponScannedPage />} />

          <Route path="/bicycles" element={<BicyclesPage />} />
          <Route path="/bicycle" element={<BicyclePage />} />

          <Route path="/bank" element={<BankPage />} />
          <Route path="/bus-survey" element={<BusSurveyPage />} />
          <Route index path="uniform" element={<UniformRegistrationPage />} />
          <Route path="/guides" element={<GuidePage />} />
          <Route path="/guide" element={<GuideDetailPage />} />

          <Route path="/health" element={<HealthDetailPage />} />
          <Route path="/healths" element={<HealthPage />} />
          <Route path="/photocopy/*" element={<PhotocopyRoutes />} />

          <Route path="/bus-registration" element={<BusRegistrationPage />} />

          <Route path="/driving-admin" element={<AdminDrivingPage />} />
          <Route
            path="/bicycle-admin"
            element={
              <RequireAdminAuth>
                <AdminBicyclePage />
              </RequireAdminAuth>
            }
          />
          <Route
            path="admin/*"
            element={
              <RequireAdminAuth>
                <AdminRoutes />
              </RequireAdminAuth>
            }
          />

          <Route path="/support" element={<SupportPage />} />
          <Route path="/maintain" element={<MaintainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("user-jwt-tk");
  const refreshToken = localStorage.getItem("user-jwt-rftk");

  if (!token || !refreshToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

const RequireAdminAuth = ({ children }) => {
  const token = localStorage.getItem("user-jwt-tk");
  const refreshToken = localStorage.getItem("user-jwt-rftk");
  const role = localStorage.getItem("user-role");

  if (!token || !refreshToken || Number(role) === 0 || !role) {
    return <Navigate to="/login" />;
  }
  return children;
};

const LayoutStyled = styled.div`
  margin: ${(props) => (props.isTablet === true ? "0 0%" : "0 15%")};
`;

const NavStyled = styled.div`
  position: sticky;
  z-index: 2000;
  top: ${(props) => (props.status === "down" ? "-150px" : "0px")};
  transition: all;
  transition-duration: 0.25s;
`;

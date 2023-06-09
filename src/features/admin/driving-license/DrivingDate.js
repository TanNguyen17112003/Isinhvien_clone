import React, { useState, useEffect } from "react";
import styles from "./drivingDate.module.css";

import DrivingApi from "api/drivingApi";

function DrivingByDate() {
  const [dates, setDates] = useState([]);
  const [drivingDate, setDrivingDate] = useState(null);
  const [drivingTime, setDrivingTime] = useState("buổi sáng");

  useEffect(() => {
    let today = new Date();
    today = today.toISOString().split("T")[0];
    setDrivingDate(today);

    DrivingApi.getAllDrivingsDate()
      .then((res) => {
        const temp = res.data;

        for (let e of temp) {
          e.date = new Date(e.date);
        }

        setDates(temp);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleVisibleButton = (_id, date, isVisible, formVisible = false) => {
    DrivingApi.handleVisibleButton(_id, date, isVisible, formVisible)
      .then((res) => {
        DrivingApi.getAllDrivingsDate()
          .then((res) => {
            const temp = res.data;

            for (let e of temp) {
              e.date = new Date(e.date);
            }

            setDates(temp);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert("Vui lòng liên hệ quản trị để cập nhật");
      });
  };

  const handleAddDateButton = () => {
    const date = new Date(drivingDate);
    let dateStr = "";

    switch (date.getDay()) {
      case 0:
        dateStr = "thứ Hai";
        break;
      case 1:
        dateStr = "thứ Ba";
        break;
      case 2:
        dateStr = "thứ Tư";
        break;
      case 3:
        dateStr = "thứ Năm";
        break;
      case 4:
        dateStr = "thứ Sáu";
        break;
      case 5:
        dateStr = "thứ Bảy";
        break;
      case 5:
        dateStr = "Chủ Nhật";
        break;

      default:
        break;
    }

    let description = `Ngày ${date.toLocaleDateString(
      "en-GB"
    )} ${dateStr} ${drivingTime}.`;

    DrivingApi.handleAddDateButton(drivingDate, true, description)
      .then((res) => {
        DrivingApi.getAllDrivingsDate()
          .then((res) => {
            const temp = res.data;

            for (let e of temp) {
              e.date = new Date(e.date);
            }

            setDates(temp);
            alert("Thêm ngày thành công");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert("Vui lòng liên hệ quản trị để thêm ngày");
      });
  };

  const handleDateChange = (e) => {
    let date = new Date(`${e.target.value} 12:00:00`);
    setDrivingDate(date);
  };

  const handleTimeChange = (e) => {
    console.log(e.target.value);
    setDrivingTime(e.target.value);
  };

  return (
    <div>
      <div className={styles.addDate}>
        <input
          type="date"
          id="start"
          name="trip-start"
          defaultValue={drivingDate}
          onChange={handleDateChange}
        />
        <select onChange={handleTimeChange} defaultValue={drivingTime}>
          <option value="buổi sáng">Buổi sáng</option>
          <option value="buổi chiều">Buổi chiều</option>
        </select>
        <button
          onClick={() => handleAddDateButton()}
          className={styles.dateButton}
        >
          Thêm ngày
        </button>
      </div>
      <p style={{ textAlign: "center" }}>
        Chỉ có thể thêm và ẩn, không thể xóa. Mặc định sau khi thêm, ngày sẽ bị
        ẩn.
      </p>
      <div>
        {dates.map((child, index) => {
          return (
            <div className={styles.dateContainer}>
              <span>{child.date.toLocaleDateString()}</span>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    true,
                    child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.isVisible
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : null
                }
              >
                Hiện
              </button>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    false,
                    child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.isVisible
                    ? null
                    : { backgroundColor: "var(--primary)", color: "white" }
                }
              >
                Ẩn
              </button>
              <button
                onClick={() => {
                  handleVisibleButton(
                    child._id,
                    child.date,
                    child.isVisible,
                    !child.formVisible
                  );
                }}
                className={styles.dateButton}
                style={
                  child.formVisible
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : null
                }
              >
                Hiện trên website
              </button>
            </div>
          );
        })}
      </div>
      <div>{dates.length <= 0 ? "Không có dữ liệu" : null}</div>
    </div>
  );
}

export default DrivingByDate;

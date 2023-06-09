import React, { useState } from "react";
import styles from "./driving.module.css";

import mime from "mime-types";

import DrivingApi from "api/drivingApi";

function Driving(props) {
  let {
    name,
    portrait,
    portraitId,
    frontsideId,
    frontside,
    backsideId,
    backside,
    receiptId,
    receipt,
    paymentMethod,
    isPaid,
    date,
    createdAt,
    zalo,
    tel,
    messageSent,
    drivingType,
    source,
    dup,
    _id,
  } = props.info;

  const showImage = props.showImage;
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(messageSent);
  const [feedback, setFeedback] = useState(props.info.feedback || "");
  const [processState, setProcessState] = useState(props.info.processState);
  createdAt = new Date(createdAt);

  if (date) {
    date = new Date(date);
  } else {
    date = null;
  }

  let sourceText = "Không có";

  if (source === 1) {
    sourceText = "Langf";
  } else if (source === 2) {
    sourceText = "UEL";
  } else if (source === 3) {
    sourceText = "Anh Long";
  } else if (source === 4) {
    sourceText = "Thư quán UEL";
  } else if (source === 5) {
    sourceText = "5";
  }

  const [selectedDate, setSelectedDate] = useState(date);

  const updateDate = () => {
    const tmpDate = new Date(selectedDate);

    DrivingApi.updateDrivingDate(_id, tmpDate)
      .then((res) => {
        if (res.data) {
          alert(
            "Đã cập nhật ngày thành " + new Date(res.date).toLocaleDateString()
          );
        } else {
          alert("Không thể cập nhật ngày. Id không hợp lệ");
        }
      })
      .catch((e) => alert("Không thể cập nhật. Lỗi: " + e));
  };

  const updateFeedback = () => {
    console.log(feedback);

    DrivingApi.updateDrivingFeedback(_id, feedback)
      .then((res) => {
        if (res.data) {
          alert("Đã lưu ghi chú ");
        } else {
          alert(res.message);
        }
      })
      .catch((e) => alert("Không thể cập nhật. Lỗi: " + e.toString()));
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleTelCopy = () => {
    navigator.clipboard.writeText(tel);
    setCopied(true);
  };

  const updateProcessState = (state) => {
    setLoading(true);
    DrivingApi.updateProcessState(props.id, state)
      .then((res) => {
        setProcessState(res.data.processState);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert(error);
      });
  };

  const handleImageButton = (filename) => {
    let name = filename.split("-");
    name = name[3] + "-" + name[4];
    const fileType = mime.lookup(name);

    DrivingApi.getImage(name)
      .then(async (res) => {
        showImage(`data:${fileType};base64, ${res.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMessageSent = () => {
    DrivingApi.updateMessageSent(props.id, !sent)
      .then((res) => {
        setSent(res.data.messageSent);
        setProcessState(res.data.processState);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.firstRow}>
          {date ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <select
                className={styles.date}
                onChange={handleDateChange}
                defaultValue={selectedDate}
              >
                {props.dateList ? (
                  <>
                    {props.dateList.map((child) => {
                      let tmpDate = new Date(child.date);
                      return (
                        <option value={tmpDate}>
                          {tmpDate.toLocaleDateString("en-GB")}
                        </option>
                      );
                    })}
                  </>
                ) : null}
              </select>
              <button
                className="btn btn-outline-primary mt-2"
                onClick={updateDate}
              >
                Cập nhật
              </button>
            </div>
          ) : null}
          <p className={styles.date}>{createdAt.toLocaleDateString("en-GB")}</p>
          <p className={styles.name}>{name}</p>
          <p className={styles.tel}>
            {tel}
            <br />
            {copied ? (
              <button className={styles.copyButton} onClick={handleTelCopy}>
                Đã chép
              </button>
            ) : (
              <button className={styles.copyButton} onClick={handleTelCopy}>
                Sao chép
              </button>
            )}
            <br />
            {zalo}
            <br />
            <a
              className={styles.zalo}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://zalo.me/${zalo}`}
            >
              Mở Zalo
            </a>
          </p>
          <p className={styles.payment}>
            {paymentMethod ? "Thanh toán trực tiếp" : "Chuyển khoản"}
          </p>
          <p className={styles.paid}>
            {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </p>
        </div>
        <div className={styles.thirdRow}>
          {drivingType === 0 ? (
            <p style={{ paddingLeft: "1rem", fontWeight: "bold" }}>
              Loại: Bằng A1
            </p>
          ) : null}
          {drivingType === 1 ? (
            <p
              style={{ color: "red", paddingLeft: "1rem", fontWeight: "bold" }}
            >
              Loại: Bằng A2
            </p>
          ) : null}
          {drivingType === 2 ? (
            <p
              style={{ color: "red", paddingLeft: "1rem", fontWeight: "bold" }}
            >
              Loại: Bằng B2
            </p>
          ) : null}
          <button
            className="btn btn-outline-primary ms-3"
            style={sent ? { background: "#F7B205", color: "white" } : null}
            onClick={handleMessageSent}
          >
            Đã gửi tin nhắn
          </button>
          <p style={{ color: "#F7B205", paddingLeft: "1rem" }}>
            Nguồn: {sourceText}
          </p>
          <p style={{ color: "#F7B205", paddingLeft: "1rem" }}>
            Ghi chú:{" "}
            <>
              <input value={feedback} onChange={handleFeedbackChange} />
              <button
                className="btn btn-outline-primary ms-2"
                onClick={updateFeedback}
              >
                Lưu lại
              </button>
            </>
          </p>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => handleImageButton(portrait)}
            >
              Chân dung
            </button>
            <a
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://drive.google.com/file/d/${portraitId}/view`}
            >
              <img
                src="/driveicon.png"
                alt="icon"
                className={styles.driveIcon}
              />
            </a>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => handleImageButton(frontside)}
            >
              Mặt trước
            </button>
            <a
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://drive.google.com/file/d/${frontsideId}/view`}
            >
              <img
                src="/driveicon.png"
                className={styles.driveIcon}
                alt="drive-cion"
              />
            </a>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => handleImageButton(backside)}
            >
              Mặt sau
            </button>
            <a
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://drive.google.com/file/d/${backsideId}/view`}
            >
              <img
                src="/driveicon.png"
                className={styles.driveIcon}
                alt="drive-icon"
              />
            </a>
          </div>

          {receiptId ? (
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => handleImageButton(receipt)}
              >
                Biên lai
              </button>
              <a
                className={styles.button}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://drive.google.com/file/d/${receiptId}/view`}
              >
                <img
                  src="/driveicon.png"
                  className={styles.driveIcon}
                  alt="drive-icon"
                />
              </a>
            </div>
          ) : (
            <p className={styles.button} style={{ color: "#808080" }}>
              Chưa có biên lai
            </p>
          )}
        </div>
      </div>
      <div className={styles.processState}>
        <p
          onClick={() => updateProcessState(4)}
          className={styles.button}
          style={
            processState === 4
              ? {
                  backgroundColor: "#FF3131",
                  color: "white",
                  borderColor: "#FF3131",
                }
              : null
          }
        >
          Đã hủy
        </p>
        <p
          onClick={() => updateProcessState(0)}
          className={styles.button}
          style={
            processState === 0
              ? { backgroundColor: "var(--primary)", color: "white" }
              : null
          }
        >
          Đã tạo
        </p>
        <p
          onClick={() => updateProcessState(1)}
          className={styles.button}
          style={
            processState === 1
              ? { backgroundColor: "var(--primary)", color: "white" }
              : null
          }
        >
          Chờ cập nhật
        </p>
        <p
          onClick={() => updateProcessState(2)}
          className={styles.button}
          style={
            processState === 2
              ? { backgroundColor: "var(--primary)", color: "white" }
              : null
          }
        >
          Chờ thanh toán
        </p>
        <p
          onClick={() => updateProcessState(3)}
          className={styles.button}
          style={
            processState === 3
              ? {
                  backgroundColor: "#28a745",
                  color: "white",
                  borderColor: "#28a745",
                }
              : null
          }
        >
          Đã hoàn tất
        </p>
        {dup > 1 ? (
          <p style={{ color: "red", textAlign: "center" }}>
            Danh sách này có 1 hồ sơ tương tự
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Driving;

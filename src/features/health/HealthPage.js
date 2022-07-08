import React, { useState, useEffect } from 'react';
import { Loading, TitleBar } from '../_commons';
import styles from './styles.module.css';
import guideApi from './api';
import { useHistory } from 'react-router-dom';

export function HealthPage() {
  const history = useHistory();
  const filterList = ['Dành cho bạn', 'Ngẫu nhiên', 'Mới nhất'];
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [guideList, setGuideList] = useState([]);

  useEffect(() => {
    guideApi
      .getAllGuides(page, limit)
      .then((res) => {
        if (res.data) {
          setGuideList(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [page]);

  const handleFilterButton = (index) => {
    setSelected(index);
  };

  const handleReadMoreButton = (id) => {
    history.push(`/health?id=${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TitleBar title='Sức khỏe sinh viên' />
      <div className={styles.guideContainer}>
        {/* <div className={styles.filterContainer}>
          {filterList.map((child, index) => {
            return (
              <button
                className={styles.filterButton}
                style={
                  selected === index
                    ? { background: 'var(--primary)', color: 'white' }
                    : null
                }
                onClick={() => handleFilterButton(index)}
              >
                {child}
              </button>
            );
          })}
        </div> */}
        {guideList.length === 0 ? (
          <p style={{ textAlign: 'center' }}>
            Rất tiếc. Hiện chưa có bài viết mới.
            <br />
            Vui lòng quay lại sau!
          </p>
        ) : null}
        <div className={styles.guideListContainer}>
          {guideList.map((child) => {
            return (
              <div className={styles.guideItemContainer} key={child._id}>
                <h3 className={styles.title}>{child.title}</h3>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: child.content }}
                ></div>
                <button
                  className={styles.button}
                  onClick={() => handleReadMoreButton(child._id)}
                >
                  Đọc tiếp
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Loading from 'components/common/Loading';
import TitleBar from 'components/common/TitleBar';
import styles from './styles.module.css';
import healthApi from 'api/healthApi';

export function HealthDetailPage(props) {
  const search = new URLSearchParams(props.location.search);
  const guideId = search.get('id');
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    healthApi
      .getGuideById(guideId)
      .then((res) => {
        if (res.data) {
          setGuide(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TitleBar title='Bài viết' />
      <div className={styles.guideContainer}>
        <h3>{guide?.title}</h3>
        <span className={styles.date}>
          Đăng ngày: {new Date(guide?.createdAt).toLocaleDateString('en-GB')}
        </span>
        <div dangerouslySetInnerHTML={{ __html: guide?.content }}></div>
      </div>
    </>
  );
}

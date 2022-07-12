import React from 'react';
import Maintained from './Maintained';
import TitleBar from 'components/common/TitleBar';

function MaintainPage() {
  return (
    <div>
      <TitleBar title='Đang phát triển' />
      <Maintained />
    </div>
  );
}

export default MaintainPage;
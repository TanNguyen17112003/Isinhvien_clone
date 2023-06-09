import React from 'react'
import ZaloLink from 'shared/components/link/ZaloLink'
import { DRIVING_LICENSE_NUMBER } from 'shared/constants/contact'
import { convertPhoneNumber } from 'utils'
import styled from 'styled-components'

function SupportPage() {
  return (
    <>
      {/* <TitleBar title="Hỗ trợ" /> */}
      <Styles>
        <h3>Thông tin hỗ trợ</h3>
        <div className="body d-flex flex-column">
          <div>
            <span>Hotline tư vấn, phản ánh/góp ý: </span>
            <ZaloLink tel="0877876877">0877.876.877</ZaloLink>
          </div>
          <div>
            <span>Zalo hỗ trợ dịch vụ giấy phép lái xe: </span>
            <ZaloLink tel={DRIVING_LICENSE_NUMBER}>{convertPhoneNumber(DRIVING_LICENSE_NUMBER, '.')}</ZaloLink>
          </div>
          <div>
            <span>Zalo hỗ trợ kỹ thuật: </span> <ZaloLink tel="0797324886">0797.324.886</ZaloLink>
          </div>
        </div>
      </Styles>
    </>
  )
}

export default SupportPage

const Styles = styled.div`
  background-color: white;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 15px;

  h3 {
    text-align: center;
  }

  .body div {
    margin: 0.5rem 0;
  }
`

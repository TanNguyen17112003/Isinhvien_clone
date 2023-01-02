import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from 'shared/components/form/InputField';

function GuestRoomModal({ show, setShow, data }) {
  console.log(data?.name)

  const { control, setValue, handleSubmit, setError, formState: {isSubmitting}, watch, setFocus } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: data?.name || '',
      tel: data?.tel || '',
      dailyPrice: data?.dailyPrice || '',
      monthlyPrice: data?.monthlyPrice || '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const handleClearButton = (name) => {
    setValue(name, '');
    setFocus(name);
  }

  return (
    <Modal
      backdrop='static'
      fullscreen={true}
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Cập nhật thông tin phòng <b>{data?.number}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6} className='mb-3'>
            <InputField
              label='Khách hàng'
              placeholder='Nhập họ tên của bạn'
              control={control}
              name='name'
              rules={{
                maxLength: {
                  value: 50,
                  message: 'Độ dài tối đa <= 50 ký tự',
                },
                required: 'Vui lòng nhập trường này',
              }}
              onClear={handleClearButton}
            />
          </Col>
          <Col className='mb-3'>
            <InputField
              label='Số điện thoại liên hệ'
              placeholder='Nhập số điện thoại của bạn'
              control={control}
              name='tel'
              rules={{
                maxLength: {
                  value: 10,
                  message: 'Độ dài 10 ký tự',
                },
                minLength: {
                  value: 10,
                  message: 'Độ dài 10 ký tự',
                },
                required: 'Vui lòng nhập trường này',
              }}
              onClear={handleClearButton}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} className='mb-3'>
            <InputField
              label='Giá ngày'
              placeholder='Nhập giá thuê phòng theo ngày'
              control={control}
              name='dailyPrice'
              rules={{
                required: 'Vui lòng nhập trường này',
              }}
              onClear={handleClearButton}
            />
          </Col>
          <Col className='mb-3'>
            <InputField
              label='Giá tháng'
              placeholder='Nhập giá thuê phòng theo tháng'
              control={control}
              name='monthlyPrice'
              rules={{
                required: 'Vui lòng nhập trường này',
              }}
              onClear={handleClearButton}
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default GuestRoomModal;

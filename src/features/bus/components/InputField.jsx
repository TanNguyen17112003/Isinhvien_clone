import React from 'react'
import { Form } from 'react-bootstrap'

const InputField = ({ register, name, label, placeholder, type = 'text', className, require = false, errors, ...props }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label className='fw-bold'>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(`${name}`, {
          require: { require }
        })}
        className={className}
        {...props}
      />
      {errors?.name?.type === 'required' && <Form.Text>Không bỏ trống nội dung này</Form.Text>}
    </Form.Group>
  )
}

export default InputField

import React from 'react'
import RegisterQuaterComponent from '../components/RegisterQuaterComponent'
import { RegisterQ } from '../services/QuarterService';

const RegisterQuater = () => {
  const onQuart = async (data) => {
    await RegisterQ(data).then(response => {
      console.log('respuesta de quarter', response);
    }).catch(error => {
      console.log('error desde registerQiarter', error);
    })
  }

  return (
    <RegisterQuaterComponent onQuarter={onQuart} />
  )
}

export default RegisterQuater
import React from 'react'
import RegisterQuaterComponent from '../components/RegisterQuaterComponent'
import { RegisterQ } from '../services/QuarterService';

const RegisterQuater = () => {
  const onQuart = async (data) => {
    console.log('hola desde registerQuarter', data);
    await RegisterQ(data).then(response => {
      data.setLoading(false);
      console.log('respuesta de quarter', response);
    }).catch(error => {
      console.log('error desde registerQiarter', error);
      data.setLoading(false);
    })
  }

  return (
    <RegisterQuaterComponent onQuarter={onQuart} />
  )
}

export default RegisterQuater
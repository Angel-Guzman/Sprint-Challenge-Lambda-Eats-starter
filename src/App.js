import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid'
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'
import PizzaForm from './components/PizzaForm'
import Order from './components/Order'
import homepage from './Assets/homepage.jpg'


const Homepage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;


const url = 'https://reqres.in/api/users'

  const initialFormValues = {
    id: uuid(),
    fullname: '',
    size: '',
    toppings: {
      pepperoni: false,
      sausage: false,
      chicken: false,
      peppers: false,
    },
    special: '',
  }

  const initialFormErrors = {
    fullname: '',
    size: '',
    toppings: {
      pepperoni: false,
      sausage: false,
      chicken: false,
      peppers: false,
    },
    special: '',
  }


  const formSchema = yup.object().shape({
    fullname: yup
    .string()
    .min(2, 'at least 2 letters for full name is required')
    .required('full name is required'),
    size: yup
    .string()
    .matches(/(small|large)/, 'either small or large')
    .required('pizza size is required'),
    special: yup
    .string()
    .min(2, 'at least 2 letters for special instructions is required'),
    
  })

const App = () => {

  const [orders, setOrders] = useState([])

  const [formValues, setFormValues] = useState(initialFormValues)

  const [formDisabled, setFormDisabled] = useState(true)

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const onInputChange = evt => {

    const name = evt.target.name
    const value = evt.target.value

    yup
    .reach(formSchema, name)
    .validate(value)
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: '',
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })

    setFormValues({
      ...formValues,
      [name]: value,
    })
}

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const isChecked = evt.target.checked

    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      }
    })
}

  const postOrder = order => { 
    axios.post(url, order)
      .then(res => {
        setOrders([res.data, ...orders])
      })
      .catch(err => {
        debugger
      })
}

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => { 
        setFormDisabled(!valid)
      })
  }, [formValues])

const onSubmit = evt => {
  evt.preventDefault()

  const newOrder = {
    fullname: formValues.fullname,
    size: formValues.size === 'large' ? false : true,
    toppings: Object.keys(formValues.toppings)
      .filter(topping => formValues.toppings[topping] === true),
    special: formValues.special
  }

  postOrder(newOrder)
  setFormValues(initialFormValues)
}

  return (
    <div>
      <Switch>
        <Route path='/pizza' >
          <PizzaForm
            values={formValues} 
            onInputChange={onInputChange}
            onCheckboxChange={onCheckboxChange} 
            onSubmit={onSubmit} 
            disabled={formDisabled}
            errors={formErrors} 
          />       
          {
            orders.map(order => {
              return (
                <Order key={order.id} details={order} />
              )
            })
          }
        </Route>
        
        <Route path='/'>
          <Homepage>
            <h1>Mario's Pizza</h1>
            <img src={homepage} height='250' width='500' />
            <Link to="/pizza"><h2>Order Now</h2></Link>
          </Homepage>

        </Route>

      </Switch>
    </div>
  );
};
export default App;

import React from "react";
import { Link } from 'react-router-dom';

const PizzaForm = (props) => {

    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors,
    } = props

    return (
        <form className='container'>
            <Link to="/"><h2>Home</h2></Link>
            <h2>Pizza Form</h2>

            {/* ERRORS */}
            <div className='errors'>
            <div>{errors.fullname}</div>
            <div>{errors.size}</div>
            <div>{errors.special}</div>
            {/* <div>{errors.tos}</div> */}
            </div>
            {/* TEXT INPUTS */}
             <label>Full Name:
                <input
                data-cy_fullname_input="cy_fullname_input"
                value={values.fullname}
                onChange={onInputChange} 
                name='fullname'
                type='text' />
            </label><br /> 

            {/* SIZE DROPDOWN */}
            <label>Pizza Size:&nbsp;
                <select
                    data-cy_size_dropdown="cy_size_dropdown"
                    value={values.size}
                    onChange={onInputChange}
                    name='size'
                >
                    <option defaultValue=''>Please choose</option>
                    <option value='small'>Small</option>
                    {/* <option value='medium'>Medium</option> */}
                    <option value='large'>Large</option>
                </select>
            </label><br />

            {/* TOPPINGS CHECKLIST */}
            <label>Pepperoni:
                <input
                data-cy_pepperoni_checkbox="cy_pepperoni_checkbox" 
                checked={values.toppings.pepperoni}
                onChange={onCheckboxChange} 
                name='pepperoni'
                type='checkbox' />
            </label><br />

            <label>Sausage:
                <input
                data-cy_sausage_checkbox="cy_sausage_checkbox" 
                checked={values.toppings.sausage}
                onChange={onCheckboxChange} 
                name='sausage'
                type='checkbox' />
            </label><br />

            <label>Chicken:
                <input
                data-cy_chicken_checkbox="cy_chicken_checkbox" 
                checked={values.toppings.chicken}
                onChange={onCheckboxChange} 
                name='chicken'
                type='checkbox' />
            </label><br />
                
            <label>Peppers:
                <input
                data-cy_peppers_checkbox="cy_peppers_checkbox" 
                checked={values.toppings.peppers}
                onChange={onCheckboxChange} 
                name='peppers'
                type='checkbox' />
            </label><br />
             
            <label>Special Instructions:
                <input
                data-cy_special_input="cy_special_input"
                value={values.special}
                onChange={onInputChange}
                name='special'  
                type='text' />
            </label><br />
            {/* SUBMIT BUTTON */}
            <button data-cy_submit="submit" onClick={onSubmit} disabled={disabled}>Add to Order</button>
        </form>
    )
}

export default PizzaForm;
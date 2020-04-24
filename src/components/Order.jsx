import React from 'react'

function Order ({ details }) {
    if(!details) {
        return <h3>Working on fetching your order...</h3>
    }
    return (
        <div>

        <h2>{details.fullname}</h2>
        
        <p>Size: {details.size ? 'Small' : 'Large'}</p>
  
        {
          !!details.toppings && !!details.toppings.length &&
          <div>
            Toppings:
            <ul>
              {
                details.toppings.map((like, idx) => <li key={idx}>{like}</li>)
              }
            </ul>
          </div>
        }
        
        <p>Special Instructions: {details.special}</p>
      </div> 
    )
}

export default Order;
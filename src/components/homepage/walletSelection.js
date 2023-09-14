import React from 'react';
import "./homepage.css";


const WalletSelection = (props) => {
    return (
        <div>
             <form onSubmit={props.handleBet}>
               <input type="text" name={props.nameone} value={props.valueone} placeholder="₹ 200" onChange={props.handlechangeone} />
               <input className="bet" name={props.nametwo} value={props.valuetwo} onClick={props.handlechangetwo} />
                  <button type="submit" className="buttons">Bet</button>
                  </form>
        </div>
    );
};

export default WalletSelection;
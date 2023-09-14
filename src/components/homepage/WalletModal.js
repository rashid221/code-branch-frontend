import React from 'react';
import ReactDOM from 'react-dom';
import "./homepage.css";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const WalletModal = (props) => {
    return ReactDOM.createPortal(<>
        <div className='modal-wrapper'>
            <div className='modal-containers'>
              <p className='error-center'><WarningAmberIcon fontSize='small'/> {props.msg}</p>
         </div>
        </div>
        </>,
        document.querySelector(".myPortalModalDiv")
        )
};

export default WalletModal;
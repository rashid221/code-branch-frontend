import React from 'react';
import ReactDOM from 'react-dom';
import "./homepage.css";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

const ShowModal = (props) => {
    // useEffect(()=>{
    //     document.body.style.overflowY = "hidden";
    //     return ()=>{
    //         document.body.style.overflowY = "scroll";
    //     }
    // },[])
    return ReactDOM.createPortal(<>
        <div className='modal-wrapper'>
            <div className='modal-container'>
          <p className='error-center'>{props.message==='Your Number Selected Successfully' ? <ThumbUpAltOutlinedIcon fontSize="small" /> : <ReportProblemOutlinedIcon fontSize="small" /> } {props.message}</p>
        </div>
        </div>
        </>,
        document.querySelector(".myPortalModalDiv")
        )
};

export default ShowModal;
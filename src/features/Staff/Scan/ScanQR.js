import './ScanQR.scss'
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { ArrowLeft } from "phosphor-react";
import { NavLink } from "react-router-dom";
const ScanQR = () => {
    const [data, setData] = useState('No result');
    const [splitData, setSplitData] = useState();
    const dataScan = data.split(",")
    const dataTime = dataScan[dataScan.length - 1]
    const dataPrice = dataScan[dataScan.length - 2]
    const dataCusId = dataScan[dataScan.length - 3]
    const dataId = dataScan[dataScan.length - 4]

    return (
        <div className='ScanPage'>
            <div className="backToHome">
                <NavLink to="/staff-personal-page" className="backtoHome">
                    <ArrowLeft size={24} color="#ffffff" weight="duotone" />
                    <div className="textBackToHome">Back to home</div>
                </NavLink>


            </div>
            <div className="scanContain">

                <h3>WebCam Scan QR Code</h3>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                            console.log(result)
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    style={{ width: '100px' }}
                />
                <p className='resultScan'>Kết quả : {data}</p>
                <div className='dataScan'>id : {dataId}</div>
                <div className='dataScan'>Customer Id : {dataCusId}</div>
                <div className='dataScan'>Price : {dataPrice}</div>
                <div className='dataScan'>Time : {dataTime}</div>
            </div>
        </div>

    )
}
export default ScanQR
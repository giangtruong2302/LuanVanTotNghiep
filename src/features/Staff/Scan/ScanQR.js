import './ScanQR.scss'
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const ScanQR = () => {
    const [data, setData] = useState('No result');
    const [splitData, setSplitData] = useState();
    return (
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
            <p className='resultScan'>Kết quả : <div className='dataScan'>{data}</div></p>
        </div>
    )
}
export default ScanQR
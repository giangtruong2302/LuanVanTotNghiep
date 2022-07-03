import './ScanQR.scss'
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
const ScanQR = () => {
    const [data, setData] = useState('No result');
    return (
        <div className="scanContain">
            <h3>WebCam Scan QR Code</h3>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100px' }}
            />
            <p>{data}</p>
        </div>
    )
}
export default ScanQR
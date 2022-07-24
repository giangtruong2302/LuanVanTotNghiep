import React, { useState } from "react";
import "./countBMI.scss";
import Modal from 'react-modal';
import { Form, Button, Input } from "antd";
import iconGif from "../../../assets/images/logo/bmiIcon.gif"
import { FormattedMessage } from "react-intl";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',


    },
};
const CountBMI = () => {
    const [form] = Form.useForm();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(event) {
        setIsOpen(true);
        event.preventDefault();
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';

    }

    function closeModal() {
        setIsOpen(false);
    }
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")


    const [sum, setSum] = useState();
    const onFinish = (values) => {
        console.log(values)
        setHeight(values.height)
        setWeight(values.weight)
        setSum((values.weight) / ((values.height) * 2));
        console.log((values.weight) / ((values.height) * 2))
        setIsOpen(true);
    }

    return (
        <div className="bgBmi">
            <Form ref={form} name="control-hooks" className="formCus" onFinish={onFinish} >

                <div className="titleInput"><FormattedMessage id="bmi-page.enter" />:</div>
                <label><FormattedMessage id="bmi-page.height" /> (m)</label>
                <Form.Item
                    name="height"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <label><FormattedMessage id="bmi-page.weight" /> (kg)</label>
                <Form.Item
                    name="weight"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>




                <Button type="primary" htmlType="submit"   >
                    <FormattedMessage id="bmi-page.check" />
                </Button>

            </Form>

            <Modal

                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            ><div><FormattedMessage id="bmi-page.yourBmi" />:</div>
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{Math.round(sum * 100) / 100} </h2>
                <img src={iconGif} style={{ height: "110px", marginLeft: "60px" }} />
                {(sum < 18.5) ? <h4><FormattedMessage id="bmi-page.skin" /></h4> : (18.5 < sum && sum < 25) ? <h4><FormattedMessage id="bmi-page.normal" /></h4> : (25 < sum && sum < 30) ? <h4><FormattedMessage id="bmi-page.overWeight" /></h4> : <h4><FormattedMessage id="bmi-page.fat" /></h4>}


            </Modal>
        </div>
    )
}
export default CountBMI
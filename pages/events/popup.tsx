import React from "react";
import {
    Modal,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    css
} from "@nextui-org/react";

export default function CertificatePopup() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const fetchCertificates = () => {};

    return (
        <div>
            <button
                onClick={handler}
                className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full p-8 text-xl"
            >
                Get your Certificate
            </button>

            <Modal
                className="bg-htb-green"
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Body>
                    <p>Please enter your registered E-Mail</p>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                    />
                    <button
                        onClick={fetchCertificates}
                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full p-8 text-xl"
                    >
                        Get your Certificate
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

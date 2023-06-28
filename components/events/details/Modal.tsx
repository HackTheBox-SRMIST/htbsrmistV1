import React from "react";
import { ToastContainer } from "react-toastify";
import { Modal, Input, Radio } from "@nextui-org/react";

interface Props {
    visibleReg: boolean;
    closeHandlerReg: () => void;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    checked: string;
    setChecked: any;
}

const ModalComp = ({
    visibleReg,
    closeHandlerReg,
    submitHandler,
    checked,
    setChecked
}: Props) => {
    const formField = [
        {
            name: "usn",
            placeholder: "Registration Number"
        },
        {
            name: "name",
            placeholder: "Name"
        },
        {
            name: "email",
            placeholder: "Email"
        },
        {
            name: "dept",
            placeholder: "Department"
        }
    ];

    return (
        <Modal
            className="bg-htb-green"
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visibleReg}
            onClose={closeHandlerReg}
        >
            <Modal.Body className="flex justify-center items-center font-mono">
                <ToastContainer />

                <p className="text-3xl font-bold max-md:text-2xl">
                    Registration Form
                </p>
                <p>Please enter your Details</p>
                <form
                    onSubmit={submitHandler}
                    className=" gap-5 flex-col flex w-full"
                >
                    {formField.map((item) => (
                        <Input
                            key={item.name}
                            required
                            type={item.name == "email" ? "email" : "text"}
                            name={item.name}
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={item.placeholder}
                        />
                    ))}

                    <Radio.Group
                        isRequired
                        value={checked}
                        onChange={setChecked}
                        name="isSrmite"
                        orientation="horizontal"
                    >
                        <div className="flex justify-around">
                            <Radio value="true" color="success">
                                SRMite
                            </Radio>
                            <Radio value="false" color="success">
                                Non-SRMite
                            </Radio>
                        </div>
                    </Radio.Group>
                    <p className="text-center font-extra-bold">
                        Check us out on {""}
                        <a
                            href="https://www.meetup.com/chennai-in/"
                            className=" text-black text-xl hover:text-[#F74160] font-bold"
                        >
                            MEETUP
                        </a>
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal text-lg rounded-lg"
                    >
                        SUBMIT
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalComp;

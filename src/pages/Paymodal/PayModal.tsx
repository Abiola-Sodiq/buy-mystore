/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { formConfig } from "../../utils/helper";

type Props = {
  amount: number;
  onClose: () => void;
};

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PayModal = ({ amount, onClose }: Props) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState<boolean>(true);

  const handlePaystackSuccess = () => {
    console.log("Payment complete!");
    setOpenModal(false);
  };

  const handleFormFinish = (values: any) => {
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_APP_SECRET_KEY,
      email: values.email,
      amount: values.amount * 100,
      currency: "NGN",
      callback: handlePaystackSuccess,
      onClose: () => {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <Modal
      open={openModal}
      onCancel={() => {
        setOpenModal(false);
        onClose(); 
      }}
      footer={null}
      className="p-6 space-y-4"
    >
      <Form
        form={form}
        {...formConfig}
        fields={[
          {
            name: "email",
            value: "",
          },
          {
            name: "amount",
            value: amount,
          },
        ]}
        onFinish={handleFormFinish}
      >
        <Form.Item
          label={
            <span className="text-base font-semibold text-[#333333] mt-6 ">
              Please Enter E-mail Address to proceed with payment
            </span>
          }
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid Email Address" },
          ]}
        >
          <Input
            className="w-full rounded-xl border border-[#E3E6EA] !py-4 placeholder:!text-base placeholder:font-normal placeholder:text-[#666666]"
            placeholder="Enter your email address"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="text-base font-normal text-[#333333]">Amount</span>
          }
          name="amount"
          rules={[{ required: true, message: "Amount is required" }]}
        >
          <Input
            className="w-full rounded-xl border border-[#E3E6EA] !py-4 placeholder:!text-base placeholder:font-normal placeholder:text-[#666666]"
            disabled
            prefix="₦"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className=" w-full py-6 bg-stone-600 !text-white rounded-xl text-lg  flex justify-center items-center"
        >
          Proceed to Pay
        </Button>
      </Form>
    </Modal>
  );
};

export default PayModal;

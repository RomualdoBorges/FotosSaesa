import React from "react";
import { Alert, Space } from "antd";

const Message = () => {
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Alert message="Cadastro Realizado!" type="success" showIcon />
      </Space>
    </div>
  );
};

export default Message;

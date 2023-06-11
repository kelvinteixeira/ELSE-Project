import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Upload,
  message,
  UploadProps,
} from "antd";
import { useState, useEffect, ChangeEvent } from "react";
import { CarProps } from "../Global/types";
import { api } from "../api";

type OffersRegisterModal = {
  openModal: boolean;
  handleClose: () => void;
};

type FormState = {
  [key: string]: string;
};

export function OffersRegisterModal(props: OffersRegisterModal) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [formState, setFormState] = useState<FormState>({});
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function onFinish(values: CarProps) {
    try {
      await api.post("/offers", {
        brand: values.brand,
        model: values.model,
        year: values.year,
        price: values.price,
        mileage: values.mileage,
        color: values.color,
        plate: values.plate,
        city: values.city,
        images: values.images,
        registerDate: new Date(),
      });
      message.success("Oferta registrada com sucesso!", 3);
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Algo inesperado aconteceu!", 3);
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={props.openModal}
      onOk={props.handleClose}
      onCancel={props.handleClose}
      width={600}
      centered
      footer={null}
    >
      <Typography.Title style={{ textAlign: "center" }}>
        Cadastrar nova oferta
      </Typography.Title>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="registerOffer"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Marca"
              name="brand"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                name="brand"
                value={formState.brand || ""}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Modelo"
              name="model"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                name="model"
                value={formState.model || ""}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Ano"
              name="year"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                name="year"
                value={formState.year || ""}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Preço"
              name="price"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                addonBefore="R$"
                value={formState.price || ""}
                name="price"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Kms"
              name="mileage"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                addonAfter={"km"}
                value={formState.mileage || ""}
                name="mileage"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="cor"
              name="color"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                value={formState.color || ""}
                name="color"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Placa"
              name="plate"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                value={formState.plate || ""}
                name="plate"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input
                value={formState.city || ""}
                name="city"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="images"
              label="Imagens"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Upload
                action="http://localhost:3000/offers"
                multiple
                beforeUpload={() => false}
                maxCount={3}
                fileList={fileList}
                onChange={({ file, fileList }) => {
                  if (file.status !== "uploading") {
                    console.log(file, fileList);
                  }
                  if (file.status === "done") {
                    message.success(`${file.name} 
                                     file uploaded successfully`);
                  } else if (file.status === "error") {
                    message.error(`${file.name} 
                                   file upload failed.`);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>
                  Selecione no máximo 3 arquivos
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Button type="primary" htmlType="submit" onClick={props.handleClose}>
            Enviar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}

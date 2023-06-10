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
import { RcFile } from "antd/es/upload";

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
  const [uploading, setUploading] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const params: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  async function onFinish(values: CarProps) {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });

    setUploading(true);
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
      setUploading(false);
      message.success("Oferta registrada com sucesso!", 3);
      form.resetFields()
    } catch (error) {
      console.log(error)
      message.error("Algo inesperado aconteceu!", 3);

    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Upload
                {...params}
                action="http://localhost:3000/offers"
                multiple
                maxCount={3}
                fileList={fileList}
                onChange={(response) => {
                  if (response.file.status !== "uploading") {
                    console.log(response.file, response.fileList);
                  }
                  if (response.file.status === "done") {
                    message.success(`${response.file.name} 
                                     file uploaded successfully`);
                  } else if (response.file.status === "error") {
                    message.error(`${response.file.name} 
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
          <Button
            disabled={fileList.length === 0}
            loading={uploading}
            type="primary"
            htmlType="submit"
            onClick={props.handleClose}
          >
            Enviar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}

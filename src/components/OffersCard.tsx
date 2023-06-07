import { useState } from "react";
import { Typography, Card, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { CarProps } from "../Global/types";
import { CarModal } from "./CarModal";

export function OffersCard(props: CarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        hoverable
        type="inner"
        style={{ width: 350, padding: 5, margin: 25 }}
        cover={
          <img style={{ padding: 5 }} alt="imagem do carro" src={props.image} />
        }
        title={`${props.brand} ${props.model}`}
      >
        <Row justify={"end"}>
          <Typography.Text>Ano: {props.year} </Typography.Text>
        </Row>
        <Row justify={"end"}>
          <Typography.Text style={{ fontSize: 10, lineHeight: 2 }} strong>
            R$:
          </Typography.Text>{" "}
          &nbsp;
          <Typography.Text
            style={{ fontSize: 20, fontFamily: "Montserrat" }}
            strong
          >
            {props.price}{" "}
          </Typography.Text>
        </Row>
        <Row justify={"start"} align={"middle"}>
          <EyeOutlined /> &nbsp;
          <Typography.Text>{props.visualizationCounter} </Typography.Text>
        </Row>
      </Card>
      <CarModal {...props} openModal={isModalOpen} handleClose={handleClose} />
    </>
  );
}

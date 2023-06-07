import { useState } from "react";
import { Typography, Card, Row, Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { CarProps } from "../Global/types";
import { CarModal } from "./CarModal";

export function OffersCard(props: CarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        hoverable
        type="inner"
        style={{ width: 350, padding: 5, margin: 25 }}
      >
        <Row justify={"center"}>
          <Typography.Title>{props.model}</Typography.Title>
        </Row>
        <Image
          alt={`Imagem de um ${props.model}, marca ${props.brand}`}
          src={props.image}
          preview={false}
        />
        <Row justify={"end"}>
          <Typography.Text>Marca: {props.brand} </Typography.Text>
        </Row>
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
      <CarModal {...props} openModal={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </>
  );
}

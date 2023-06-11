import { useState } from "react";
import { Typography, Card, Row, Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { CarProps } from "../Global/types";
import { OffersModal } from "./OffersModal";
import { api } from "../api";

export function OffersCard(props: CarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visualizationCount, setVisualizationCount] = useState(
    props.visualizationCounter
  );

  async function incrementVisualization(id: number) {
    await api.patch(`/offers/${id}`, {
      visualizationCounter: visualizationCount + 1,
    });
    setVisualizationCount(visualizationCount + 1);
  }

  return (
    <>
      <Card
        key={props.id}
        onClick={() => {
          setIsModalOpen(true);
          incrementVisualization(props.id);
        }}
        hoverable
        type="inner"
        style={{ width: 350, padding: 5, margin: 10 }}
      >
        <Row justify={"center"}>
          <Typography.Title>{props.model}</Typography.Title>
        </Row>
        <Image
          alt={`Imagem de um ${props.model}, marca ${props.brand}`}
          src={props.images[0]}
          preview={false}
          width={300}
          height={200}
        />
        <Row justify={"end"}>
          <Typography.Text>Marca: {props.brand} </Typography.Text>
        </Row>
        <Row justify={"end"}>
          <Typography.Text>Ano: {props.year} </Typography.Text>
        </Row>
        <Row justify={"end"}>
          <Typography.Text
            style={{ fontSize: 20, fontFamily: "Montserrat" }}
            strong
          >
            {props.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
          </Typography.Text>
        </Row>
        <Row justify={"start"} align={"middle"}>
          <EyeOutlined /> &nbsp;
          <Typography.Text>{visualizationCount} </Typography.Text>
        </Row>
      </Card>
      <OffersModal
        {...props}
        openModal={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

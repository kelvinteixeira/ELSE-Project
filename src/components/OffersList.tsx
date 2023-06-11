import { useState } from "react";
import { List, Typography, Row, Image, Col, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { CarProps } from "../Global/types";
import { OffersModal } from "./OffersModal";
import { api } from "../api";

export function OffersList(props: CarProps) {
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
      <List
        style={{
          width: "50%",
          marginTop: 20,
          backgroundColor: "white",
          cursor: "pointer",
          border: "solid",
        }}
      >
        <Tooltip title={`Clique para mais infomações sobre o ${props.model}`}>
          <List.Item
            key={props.id}
            onClick={() => {
              setIsModalOpen(true);
              incrementVisualization(props.id);
            }}
          >
            <Row align={"middle"} style={{ padding: 5 }} gutter={40}>
              <Col>
                <Image
                  alt={`Imagem de um ${props.model}, marca ${props.brand}`}
                  width={80}
                  height={50}
                  src={props.images[0]}
                  preview={false}
                />
              </Col>
              <Col>
                <Typography.Text style={{ fontSize: 20 }}>
                  {props.model}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text>{props.brand}</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>{props.year}</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>
                  {props.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Row style={{ paddingLeft: 15 }} align={"middle"}>
                  <EyeOutlined /> &nbsp;
                  <Typography.Text>
                    {visualizationCount}
                  </Typography.Text>
                </Row>
              </Col>
            </Row>
          </List.Item>
        </Tooltip>
      </List>
      <OffersModal
        {...props}
        openModal={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

import { List, Typography, Row, Image } from "antd";
import { CarProps } from "../Global/types";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CarModal } from "./CarModal";

interface OffersListProps {
  dataSource: CarProps[];
}

export function OffersList({ dataSource }: OffersListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(0);
  return (
    <>
      <List
        style={{
          width: "100%",
          padding: 10,
          margin: 50,
          backgroundColor: "white",
        }}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <>
            <List.Item
              onClick={() => {
                setSelectedOffer(item.id);
                setIsModalOpen(true);
              }}
            >
              <List.Item.Meta
                avatar={<Image width={80} height={50} src={item.cover} />}
                title={<Typography.Text>{item.model}</Typography.Text>}
                description={`Marca: ${item.brand}, Ano: ${item.year}, Valor: R$ ${item.price}`}
              />
              <Row justify={"start"} align={"middle"}>
                <EyeOutlined /> &nbsp;
                <Typography.Text>{item.visualizationCounter} </Typography.Text>
              </Row>
            </List.Item>
            {selectedOffer === item.id && (
              <CarModal
                {...item}
                openModal={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
              />
            )}
          </>
        )}
      />
    </>
  );
}

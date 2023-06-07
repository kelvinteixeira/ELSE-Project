import { Typography, Card, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export type OffersCardProps = {
  image: string;
  model: string;
  price: number;
  brand: string;
  year: number;
  visualizationCounter: number;
};

export function OffersCard(props: OffersCardProps) {
  return (
    <Card
    hoverable
    type="inner"
      style={{ width: 350, padding: 5, margin: 25, boxShadow: '60 60', }}
      cover={
        <img style={{ padding: 5 }} alt="imagem do carro" src={props.image} />
      }
      title={`${props.brand} ${props.model}`}
    >
      <Row justify={"end"}>
        <Typography.Text >
          Ano de fabricação: {props.year}{" "}
        </Typography.Text>
      </Row>
      <Row justify={"end"}>
        <Typography.Text  style={{ fontSize: 10, lineHeight: 2 }} strong>
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
  );
}

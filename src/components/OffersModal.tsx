import { Col, Modal, Typography, Row, Image, Carousel } from "antd";
import { CarProps } from "../Global/types";
import { formatDate } from "../utils/date";

interface OffersModalProps extends CarProps {
  openModal: boolean;
  handleClose: () => void;
}

export function OffersModal(props: OffersModalProps) {
  return (
    <>
      <Modal
        open={props.openModal}
        onOk={props.handleClose}
        onCancel={props.handleClose}
        width={950}
        centered
        footer={null}
      >
        <Typography.Title
          style={{ textAlign: "center" }}
        >{`${props.brand} ${props.model}`}</Typography.Title>

        <Row justify={"space-evenly"}>
          <Col span={12}>
            <Carousel dotPosition={"top"}>
              {props.images.map((image) => (
                <Image alt="imagem do carro" src={image} />
              ))}
            </Carousel>
          </Col>

          <Col>
            <Typography.Text
              strong
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {" "}
              Mais informações
            </Typography.Text>

            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Marca:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.brand}</Typography.Text>
            </Row>

            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Valor de compra:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>
                {props.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Modelo:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.model}</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Ano:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.year}</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Cor:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.color}</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Placa:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.plate}</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Cidade:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.city}</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Quilometragem atual:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{props.mileage} Km</Typography.Text>
            </Row>
            <Row align={"middle"}>
              <Typography.Text strong style={{ fontSize: 14 }}>
                Data de cadastro:
              </Typography.Text>{" "}
              &nbsp;
              <Typography.Text>{formatDate(new Date(props.registerDate))}</Typography.Text>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

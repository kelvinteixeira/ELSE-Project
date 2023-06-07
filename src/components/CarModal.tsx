import { Button, Col, Modal, Typography, Row, Tooltip,Image  } from "antd";
import { CarProps } from "../Global/types";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";

interface CarModalProps extends CarProps {
  openModal: boolean;
  handleClose: () => void;
}

export function CarModal(props: CarModalProps) {
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
          <Col>
            <Col>
              <Image 
                style={{
                  display: "flex",
                  padding: 5,
                  width: 600,
                  justifyContent: "center",
                  marginBottom: 10,
                }}
                alt="imagem do carro"
                src={props.image}
              />
            </Col>
            <Row align={"middle"} justify={"space-evenly"}>
              <Tooltip title="Foto anterior">
                <Button icon={<LeftCircleTwoTone />} />
              </Tooltip>
              <Tooltip title="Próxima foto">
                <Button icon={<RightCircleTwoTone />} />
              </Tooltip>
            </Row>
          </Col>

          <Col>
            <Typography.Text strong style={{ margin: 30, fontSize: 20 }}>
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
              <Typography.Text>R$ {props.price}</Typography.Text>
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
              <Typography.Text>{props.registerDate}</Typography.Text>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

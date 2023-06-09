import { useState } from "react";
import { Button, Col, Image, Row, Table, Tooltip, Input } from "antd";
import { CarProps } from "../Global/types";
import { fakeCars } from "../mock";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

export function OffersTable() {
  const [searchValue, setSearchValue] = useState("");
  const searchToLowerCase = searchValue.toLowerCase();

  const cars = fakeCars.filter(
    (cars) =>
      cars.brand.toLowerCase().includes(searchToLowerCase) ||
      cars.model.toLowerCase().includes(searchToLowerCase)
  );

  const columns: ColumnsType<CarProps> = [
    {
      title: "Fotos",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={100} src={image} />,
      width: "10%",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Valor",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Cor",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Quilometragem",
      dataIndex: "mileage",
      key: "mileage",
    },
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Data de registro",
      dataIndex: "registerDate",
      key: "registerDate",
    },
    {
      title: "Ações",
      dataIndex: "id",
      align: "center",
      render: () => (
        <Row justify={"space-around"}>
          <Tooltip title="Editar oferta" color="blue">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Excluir oferta" color="blue">
            <Button icon={<DeleteOutlined />} />
          </Tooltip>
        </Row>
      ),
    },
  ];
  return (
    <Col>
      <Row
        align={"middle"}
        justify={"end"}
        style={{ paddingTop: 20, paddingRight: 20 }}
      >
        <Search
          value={searchValue}
          type="search"
          placeholder="Busque aqui por marca ou modelo"
          allowClear
          size="middle"
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 250, marginRight: 5 }}
        />

        <Button type="primary">Nova oferta</Button>
      </Row>

      <Table
        style={{ padding: 20 }}
        columns={columns}
        dataSource={cars}
        size="small"
        bordered
        pagination={false}
        tableLayout="fixed"
      />
    </Col>
  );
}

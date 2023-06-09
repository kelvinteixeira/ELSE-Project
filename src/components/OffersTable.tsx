import { useEffect, useState } from "react";
import { Button, Col, Image, Row, Table, Tooltip, Input } from "antd";
import { CarProps } from "../Global/types";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { api } from "../api";

const { Search } = Input;

export function OffersTable() {
  const [searchValue, setSearchValue] = useState("");
  const searchToLowerCase = searchValue.toLowerCase();

  const [offers, setOffers] = useState<Array<CarProps>>([]);

  useEffect(() => {
    api.get('/offers')
    .then(response => {
      return setOffers(response.data);
    }).catch((err) => {
      console.log("Erro: ", err)
    })
  },[])

  const filteredOffers = offers.filter(
    (cars) =>
      cars.brand.toLowerCase().includes(searchToLowerCase) ||
      cars.model.toLowerCase().includes(searchToLowerCase)
  );

  const columns: ColumnsType<CarProps> = [
    {
      title: "Fotos",
      dataIndex: "cover",
      key: "cover",
      render: (image) => <Image width={100} height={70} src={image} />,
      width: "10%",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
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
        dataSource={filteredOffers}
        size="small"
        bordered
        pagination={false}
        tableLayout="fixed"
      />
    </Col>
  );
}

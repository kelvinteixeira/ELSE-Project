import { useState } from "react";
import { Image, Table, Tooltip } from "antd";
import { CarProps } from "../Global/types";
import { fakeCars } from "../mock";
import { CarModal } from "./CarModal";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

export function OffersTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnsType<CarProps> = [
    {
      title: "Imagem",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={100} src={image} />,
      width: "12%",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      filterSearch: true,
      filters: [
        {
          text: "Ferrari",
          value: "Ferrari",
        },
        {
          text: "Nissan",
          value: "Nissan",
        },
      ],
      onFilter: (value: string, record) => record.brand.startsWith(value),
      width: "15%",
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
      title: "Visualizações",
      dataIndex: "visualizationCounter",
      key: "visualizationCounter",
      sorter: (a, b) => a.visualizationCounter - b.visualizationCounter,
    },
    {
      title: "Ações",
      dataIndex: "id",
      align: "center",
      render: (_, record) => (
        <>
          <Tooltip title="Mais informações" color="blue">
            <EyeOutlined onClick={() => setIsModalOpen(true)} />
          </Tooltip>
          <CarModal
            {...record}
            openModal={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        style={{ width: 1000, marginTop: 20 }}
        columns={columns}
        dataSource={fakeCars}
        size="small"
        bordered
        pagination={false}
        tableLayout="fixed"
      />
    </>
  );
}

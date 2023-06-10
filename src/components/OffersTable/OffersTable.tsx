import { useEffect, useState } from "react";
import { Image, Button, Form, Input, Popconfirm, Row, Table } from "antd";
import { CarProps } from "../../Global/types";
import { api } from "../../api";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { formatDate } from "../../utils/date";
import { OffersRegisterModal } from "../OffersRegisterModal";
import { TableCells } from "./TableCells";

const { Search } = Input;

export function OffersTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<CarProps>>([]);
  const [editingKey, setEditingKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const searchToLowerCase = searchValue.toLowerCase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get("/offers").then((response) => setData(response.data));
  }, []);

  const isEditing = (record: CarProps) => String(record.id) === editingKey;

  const edit = (record: Partial<CarProps> & { id: number }) => {
    form.setFieldsValue({
      images: "",
      brand: "",
      model: "",
      year: 0,
      price: "",
      color: "",
      mileage: "",
      plate: "",
      city: "",
      ...record,
    });
    setEditingKey(String(record.id));
  };

  const cancel = () => {
    setEditingKey("");
  };

  async function handleDelete(id: number) {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    await api.delete(`offers/${id}`);
  }

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as CarProps;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        console.log(newData[index]);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        await api.patch(`/offers/${id}`, {
          brand: newData[index].brand,
          model: newData[index].model,
          year: newData[index].year,
          price: newData[index].price,
          mileage: newData[index].mileage,
          color: newData[index].color,
          plate: newData[index].plate,
          city: newData[index].city,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const filteredOffers = data.filter(
    (cars) =>
      cars.brand.toLowerCase().includes(searchToLowerCase) ||
      cars.model.toLowerCase().includes(searchToLowerCase)
  );

  const columns = [
    {
      title: "Fotos",
      dataIndex: "images",
      key: "images",
      render: (image: string[]) => (
        <Image width={100} height={70} src={image[0]} />
      ),
      width: "10%",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
      editable: true,
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      editable: true,
      width: "15%",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
      sorter: (firstValue: { year: number }, secondValue: { year: number }) =>
        firstValue.year - secondValue.year,
      editable: true,
    },
    {
      title: "Valor",
      dataIndex: "price",
      key: "price",
      sorter: (firstValue: { price: number }, secondValue: { price: number }) =>
        firstValue.price - secondValue.price,
      render: (_: never, record: CarProps) =>
        record.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      width: "12%",
      editable: true,
    },
    {
      title: "Cor",
      dataIndex: "color",
      key: "color",
      editable: true,
      width: "10%",
    },
    {
      title: "Kms",
      dataIndex: "mileage",
      key: "mileage",
      editable: true,
      width: "10%",
    },
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
      editable: true,
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
      editable: true,
    },
    {
      title: "Data de registro",
      dataIndex: "registerDate",
      key: "registerDate",
      render: (_: never, record: CarProps) =>
        formatDate(new Date(record.registerDate)),
      width: "8%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: never, record: CarProps) => {
        const editable = isEditing(record);
        return editable ? (
          <Row justify={"space-around"}>
            <Button
              onClick={() => save(record.id)}
              icon={<CheckCircleOutlined />}
            />
            <Popconfirm title="Quer cancelar?" onConfirm={cancel}>
              <Button icon={<CloseCircleOutlined />} />
            </Popconfirm>
          </Row>
        ) : (
          <Row justify={"space-around"}>
            <Button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            />
            {data.length >= 1 ? (
              <Popconfirm
                title="Deseja excluir?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button icon={<DeleteOutlined />}></Button>
              </Popconfirm>
            ) : null}
          </Row>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: CarProps) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
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

        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Nova oferta
        </Button>
      </Row>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: TableCells,
            },
          }}
          bordered
          dataSource={filteredOffers}
          columns={mergedColumns}
          style={{ margin: 10 }}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <OffersRegisterModal
        openModal={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

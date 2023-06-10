import { Form, Input, InputNumber } from "antd";
import { CarProps } from "../../Global/types";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: CarProps;
  index: number;
  children: React.ReactNode;
}

export function TableCells({
  editing,
  dataIndex,
  inputType,
  children,
  ...restProps
}: EditableCellProps) {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: "Campo obrigatório!",
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

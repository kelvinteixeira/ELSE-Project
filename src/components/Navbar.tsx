import { useState } from "react";
import { AppstoreOutlined, ProfileOutlined, } from "@ant-design/icons";
import { MenuProps, Typography } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: <Typography.Link href="/">Nossas ofertas</Typography.Link>,
    key: "offers",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Typography.Link href="/adminstration">Adminstração</Typography.Link>,
    key: "adminstration",
    icon: <ProfileOutlined />,
  },
];

export function Navbar() {
  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 80,
        fontWeight: 700
      }}
    />
  );
}

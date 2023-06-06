import { useState } from "react";
import { AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Ofertas",
    key: "offers",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Administraçao",
    key: "app",
    icon: <ProfileOutlined />,
  },
];

export function Navbar() {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

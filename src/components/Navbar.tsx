import { useState } from "react";
import { AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: <a href="/">Ofertas</a>,
    key: "offers",
    icon: <AppstoreOutlined />,
  },
  {
    label: <a href="/adminstration">Adminstração</a>,
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
    />
  );
}

import React from "react";
import { Menu } from "semantic-ui-react";
import { Router } from "../routes";

const Header = () => {
  return (
    <Menu>
      <Menu.Item onClick={(event) => Router.pushRoute("/")}>
        CrownCoin
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={(event) => Router.pushRoute("/")}>
          Campaigns
        </Menu.Item>
        <Menu.Item onClick={(event) => Router.pushRoute("/campaigns/new")}>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;

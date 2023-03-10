import React, { Component } from "react";
import ReactDOM from "react-dom";
import factory from "../ethereum/factory.js";
import { Card } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout.js";
import { Router, Link } from "../routes";
class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns: campaigns };
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add"
            primary={true}
            onClick={(event) => Router.pushRoute("/campaigns/new")}
          ></Button>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

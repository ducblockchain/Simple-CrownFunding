import React, { Component } from "react";
import Layout from "../../components/Layout";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Message,
  Card,
  Grid,
} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router, Link } from "../../routes";
import Campaign from "../../ethereum/campaign";
class CampaignShow extends Component {
  state = {
    amountContribution: "",
    errorMes: "",
    loading: "",
  };
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      address: props.query.address,
      minimunContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }
  renderCard() {
    const items = [
      {
        header: this.props.manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: this.props.minimunContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: this.props.requestCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: this.props.approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(this.props.balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true });

    try {
      const account = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: account[0],
        value: web3.utils.toWei(this.state.amountContribution, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMes: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Column width={10}>
            {this.renderCard()}
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <Button primary>View Request</Button>
            </Link>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Contribute to this campaign!</label>
                <Input
                  label="eth"
                  labelPosition="right"
                  value={this.state.amountContribution}
                  onChange={(event) =>
                    this.setState({ amountContribution: event.target.value })
                  }
                />
              </Form.Field>
              <Message
                error
                header="Oops!"
                content={this.state.errorMes}
              ></Message>
              <Button loading={this.state.loading} primary>
                Contribute!
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;

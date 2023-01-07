import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
class CampaignNew extends Component {
  state = {
    minimunContribution: "",
    errorMes: "",
    loading: "",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const account = await web3.eth.getAccounts();
    this.setState({ loading: true });
    try {
      await factory.methods
        .createCampaign(this.state.minimunContribution)
        .send({
          from: account[0],
        });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMes: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Create a Campaign!</h3>
        <Form error={this.state.errorMes} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimun Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimunContribution}
              onChange={(event) =>
                this.setState({ minimunContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMes}></Message>
          <Button loading={this.state.loading} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;

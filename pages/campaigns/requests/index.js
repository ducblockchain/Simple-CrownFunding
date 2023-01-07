import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
class viewRequest extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    const approversCount = summary[3];
    const requestCount = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    return { address, requests, requestCount, approversCount };
  }
  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Request</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <Button primary>Add Request</Button>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default viewRequest;

/**
*
* FaqPage
*
*/

import React from 'react';
import { Button, Well, Collapse } from 'react-bootstrap';
// import styled from 'styled-components';


class FaqPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      open: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false
    }
  }

  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
            <div className="row">
              <div className="col-sm-12 text-center">
                  <h2>FREQUENTLY ASKED QUESTIONS</h2><hr/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-left">
                <Button onClick={() => this.setState({ open: !this.state.open })} className="form-control" style={{marginBottom: '20px'}}>
                <span style={{textAlign:'left'}}>What is initial coin offering?</span>
                </Button>
                <Collapse in={this.state.open}>
                    <Well>
                    Initial Coin offering is a strategic model, also known as a token sale. The model is prepared to raise the funds for the Blockchain based projects. The Blockchain developers release their token and sell it against the Cryptocurrency like Bitcoin and Ethereum. Once the token launched in the market the participants get their share in the form of cryptocurrency.
                    </Well>
                </Collapse>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                <Button onClick={() => this.setState({ open2: !this.state.open2 })} className="form-control" style={{marginBottom: '20px'}}>
                  Are ICOs Legal?
                </Button>
                <Collapse in={this.state.open2}>
                  <div>
                    <Well>
                    The concept of initial coin offering emerged due to Blockchain technology. Actually, ICO initial coin offering is a model to raise the funds for Blockchain based projects. Its process is simple, Blockchain developers found an innovative idea and they suggest it to the community. Once the project gets approved, they prepare a white paper, where they include the scope of the project, its vision, and all technical aspects. After white paper, to reach a maximum number of investors marketing campaign begins.  During the marketing campaign, they elaborate all features and benefits of the project. ICO date is unveiled when the token sale is scheduled to begin.  There is usually a defined time period to raise the required funds, after which the sale closes. Investors then start receiving their tokens and plans are made for them to go live on exchanges for trading.
                    </Well>
                  </div>
                </Collapse>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                <Button onClick={() => this.setState({ open3: !this.state.open3 })} className="form-control" style={{marginBottom: '20px'}}>
                  What are tokens?
                </Button>
                <Collapse in={this.state.open3}>
                  <div>
                    <Well>
                    Tokens are a digital asset that is sold to the public during an ICO campaign, usually for other cryptocurrencies like Bitcoin and Ethereum.  In Crypto terminology, the distribution of token during ICO campaign is known as AirDrop. Unlike other cryptocurrencies like Bitcoin and Ethereum, tokens do not have their own blockchain rather hosted on another Blockchain.
                    </Well>
                  </div>
                </Collapse>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                <Button onClick={() => this.setState({ open4: !this.state.open4 })} className="form-control" style={{marginBottom: '20px'}}>
                  What are the advantages of token?
                </Button>
                <Collapse in={this.state.open4}>
                  <div>
                    <Well>
                    Usually, you will not get the instant advantage of the token; rather you will get its benefit when these tokens will be listed on major exchanges like Bittrex and BitFenix etc.  Let allow us to illustrate, suppose you have received 1000 token worth of 500 USD if the ICO project becomes successful and the particular token listed on site like Bittrex, then you can earn 100 to 200 times more amount selling the tokens.
                    </Well>
                  </div>
                </Collapse>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                <Button onClick={() => this.setState({ open5: !this.state.open5 })} className="form-control" style={{marginBottom: '20px'}}>
                  Which is better Bitcoin or Ethereum?  
                </Button>
                <Collapse in={this.state.open5}>
                  <div>
                    <Well>
                    In term of market cap, circulating supply, price, and volume, Bitcoin is superior to Ethereum. But when it comes to liquidity and scalability, Ethereum proves a better candidate for the long run.
                    </Well>
                  </div>
                </Collapse>
                </div>
              </div>
              </div>
            </div>
          </div>
    );
  }
}

FaqPage.propTypes = {

};

export default FaqPage;

import React from "react";

import lacroixMap from "../../utils/lacroixMap";

import { FadeIn } from "../../components/animate";

const Card = ({ lacroix, updateItem }) => (
  <div className="checkout-box" style={{ marginBottom: "10px" }}>
    <div className="item-words">
      <h3 className="item-title">{lacroix.name}</h3>
      <p className="item-desc">{lacroix.description}</p>
      {!lacroix.pickup ? (
        <a
          onClick={updateItem}
          className="round-button"
          style={{
            margin: 0,
            width: "110px",
            fontWeight: "bold",
            padding: "7px 30px"
          }}
        >
          Pickup
        </a>
      ) : (
        <FadeIn>
          <p style={{ marginTop: "20px" }}>
            Awesome! We're on our way to pick up your LaCroix.
          </p>
        </FadeIn>
      )}
    </div>
    <div className="item-image-container">
      <img style={{ height: "130px", width: "80px" }} src={lacroix.img} />
    </div>
  </div>
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const dataString = localStorage.getItem("order");

    const data = dataString ? [JSON.parse(dataString)] : [];

    this.setState({ current: data });
  };

  renderLacroix = () => {
    const { current } = this.state;

    if (current.length < 1) {
      return (
        <div className="checkout-box">
          <div className="item-words">
            <h3 className="item-title">Uh Oh.</h3>
            <p className="item-desc">
              You don't have any LaCroix! Let's change that.
            </p>
          </div>
        </div>
      );
    }

    return current
      .map(c => {
        const s = lacroixMap[c.drink];
        s.pickup = c.pickup;
        s.aws_id = c.aws_id;
        return s;
      })
      .map(c => (
        <Card lacroix={c} updateItem={() => this.updateItem(c.aws_id)} />
      ));
  };

  updateItem = async id => {
    this.setState(state => ({
      current: [
        {
          ...state.current[0],
          pickup: true
        }
      ]
    }));

    window.setTimeout(() => {
      window.localStorage.setItem("order", "");
      this.setState({ current: [] });
    }, 2000);
  };

  render() {
    return (
      <div className="order-parent">
        <div className="order-header" style={{ paddingBottom: "12px" }}>
          <div style={{ width: "70%", margin: "auto" }}>
            <h1>Current LaCroix</h1>
            <p></p>
          </div>
        </div>

        <div className="checkout-section-parent">
          <h4>Drink List</h4>
          {this.renderLacroix()}
        </div>
      </div>
    );
  }
}

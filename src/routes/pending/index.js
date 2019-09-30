import React, { Fragment } from "react";
import { navigate, Link } from "@reach/router";

import { FadeInFromTop, FadeIn } from "../../components/animate";

import Ship from "../../svg/ship";
import Celebrate from "../../svg/celebrate";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: window.localStorage.getItem("order"),
      currentFlavor: window.localStorage.getItem("pending_order_flavor"),
      name: window.localStorage.getItem("name"),
      isComplete: false
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const currentOrder = JSON.parse(this.state.currentOrder);

    if (!currentOrder) {
      navigate("/");
    }

    const interval = setInterval(async () => {
      if (currentOrder.status === "pending") {
        this.setState({ isComplete: true });
        const interval = window.localStorage.getItem("pending_order_poll");
        clearInterval(interval);

        window.localStorage.setItem("cart", "");
      }
    }, 2000);
    window.localStorage.setItem("pending_order_poll", interval);
  };

  componentDidCatch() {
    const interval = window.localStorage.getItem("pending_order_poll");
    clearInterval(interval);
  }
  componentWillUnmount() {
    const interval = window.localStorage.getItem("pending_order_poll");
    clearInterval(interval);
  }

  render() {
    const { currentOrder, currentFlavor, name, isComplete } = this.state;
    if (!currentOrder) {
      navigate("/");
      return <div></div>;
    }
    return (
      <FadeIn className="order-parent">
        <div
          className="order-header checkout"
          style={{ paddingBottom: "12px", background: "white", color: "black" }}
        >
          <h1>Order Status</h1>
        </div>

        {!isComplete ? (
          <Fragment>
            <Ship className="onboarding-svg no-pad" />
            <h2
              style={{
                fontSize: "3vh",
                textAlign: "center",
                marginTop: "25px",
                maxWidth: "70%"
              }}
            >
              Hang tight{name ? " " + name : ""}, Your
              {currentFlavor ? " " + currentFlavor : ""} LaCroix is on the way!
            </h2>
          </Fragment>
        ) : (
          <FadeInFromTop
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexDirection: "column"
            }}
          >
            <Celebrate className="onboarding-svg no-pad" />
            <h2
              style={{
                fontSize: "3vh",
                textAlign: "center",
                marginTop: "25px",
                maxWidth: "70%"
              }}
            >
              Your{currentFlavor ? " " + currentFlavor : ""} LaCroix has
              arrived. Enjoy!
            </h2>
          </FadeInFromTop>
        )}

        <div
          className="button-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link to="/" className="order-submit">
            Home
          </Link>
        </div>
      </FadeIn>
    );
  }
}

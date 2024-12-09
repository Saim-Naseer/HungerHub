import React from "react";
import StatusBar from "./StatusBar4";
import Session from "../../../Session";
import Completed from "../../Containers/Completed";
import Preparing from "./Preparing";
import Delivering from "./Delivering";
import R_Session from "./Session";

class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      completed: false,
      Rider_id:0
    };
    this.fetchInterval = null; // Store interval ID for later clearing
  }

  componentDidMount() {
    // Fetch data once on mount
    this.fetchData();

  }

  componentDidUpdate(prevProps, prevState) {
    // Only fetch data if the state or props that trigger fetching have changed
    if (this.state.isReady !== prevState.isReady || this.state.completed !== prevState.completed) {
      this.fetchDataDebounced();
    }
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/customer/placedwaitingorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}&oid=${R_Session.Order_id}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Object.keys(data).length > 0) {
        this.setState({
          isReady: data.isReady || false,
          completed: data.completed || false,
          Rider_id: data.Rider_id
        });
        R_Session.Order_id=data.Order_id
      } else {
        console.warn("No active orders found.");
        this.setState({
          isReady: false,
          completed: false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Debounced fetch function
  fetchDataDebounced = (() => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(this.fetchData, 500); // Delay fetch by 500ms to prevent rapid requests
    };
  })();

  componentWillUnmount() {
    // Clean up the interval on unmount
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
  }

  // Method to manually trigger state change (which will trigger componentDidUpdate)
  triggerStateChange = () => {
    // Toggle the `isReady` state to simulate a change
    this.setState((prevState) => ({
      isReady: !prevState.isReady,
    }));
  };

  render() {
    let content;

    // Render different components based on the state
    if (!this.state.isReady) {
      content = (
        <>
          <StatusBar />
          <Preparing />
        </>
      );
    } else if (this.state.isReady && !this.state.completed) {
      content = (
        <>
          <StatusBar />
          <Delivering  Rider_id={this.state.Rider_id}/>
        </>
      );
    } else {
      content = <Completed />;
    }

    return (
      <>
        {content}
        {/* Button to manually trigger the state change and thus componentDidUpdate */}
      </>
    );
  }
}

export default Body;

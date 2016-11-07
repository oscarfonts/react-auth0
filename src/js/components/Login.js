import React from "react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Hello World",
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}

import React, { Component } from 'react';

class Detail extends Component {
  render() {
    console.log(this.props.match.params.id)
    return(
      <div>Detail</div>
    )
  }
}

export default Detail;
import React, {  PureComponent } from 'react';
import {RecommendWrapper, RecommendItem} from "../style";
import { connect } from 'react-redux'

class Recommend extends  PureComponent {
  render() {
    const { list } = this.props;
    return(
      <RecommendWrapper>
        {
          list.map((item) => {
            return(
              <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}/>
            )
          })
        }
      </RecommendWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.get('home').get('recommendList')
});

export default connect(mapState, null)(Recommend);
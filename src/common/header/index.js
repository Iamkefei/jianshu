import React, {  PureComponent } from 'react';
import { connect } from 'react-redux'
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoList, SearchInfoItem } from './style'
import {CSSTransition} from "react-transition-group";
import { actionCreators } from './store';
import { Link } from 'react-router-dom'

class Header extends  PureComponent {
  render() {
    const { handleInputFocus, list, login } = this.props;
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo/>
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ? <NavItem className="right">退出</NavItem> :
              <Link to="/login">
                <NavItem className="right">登陆</NavItem>
              </Link>
          }
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition in={this.props.focused} timeout={200} classNames="slide">
              <NavSearch className={this.props.focused? 'focused' : ''}  onFocus={() => handleInputFocus(list)} onBlur={this.props.handleInputBlur}/>
            </CSSTransition>
            <i className={this.props.focused? 'focused zoom iconfont' : 'zoom iconfont'}>&#xe614;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">
            <i className="iconfont">&#xe615;</i>
            写文章
          </Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }

  getListArea() {
    const { focused, list, page, handleMouseEnter, handleMouseLeave, mouseIn, handleChangePage, totalPage } = this.props;
    const jsList = list.toJS();
    const pageList = [];


    if(page * 10 < jsList.length) {
      for(let i = (page -1)*10; i < page*10; i++) {
        pageList.push(jsList[i])
      }
    }else {
      for(let i = (page -1)*10; i < jsList.length; i++) {
        pageList.push(jsList[i])
      }
    }

    if(focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
              <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {
              pageList.map((item) => {
                return <SearchInfoItem key={item}>{ item }</SearchInfoItem>
              })
            }
          </SearchInfoList>
        </SearchInfo>
      )
    }else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.get('header').get('focused'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    mouseIn: state.get('header').get('mouseIn'),
    totalPage: state.get('header').get('totalPage'),
    login: state.get('login').get('login'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 聚焦
    handleInputFocus(list) {
      (list.size === 0) && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus())
    },
    // 失去焦点
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },

    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },

    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },

    handleChangePage(page ,totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if( originAngle ) {
        originAngle = parseInt(originAngle, 10)
      }else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
      if(page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      }else {
        dispatch(actionCreators.changePage(1))
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
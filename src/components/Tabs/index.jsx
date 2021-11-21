import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';
class Tab extends Component {
  static propTypes = {
    list: PropTypes.array,
    activekeys: PropTypes.string,
    closeable: PropTypes.bool,
    clickclose: PropTypes.func,
    clicktab: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      icon: false, //作业箭头显示
      index: 0, //点击次数
      length: 0, //移动长度
    };
    this.outside = React.createRef();
    this.inside = React.createRef();
    this.outsideWidth = '';
    this.insideWidth = '';
    this.count = 0;
  }
  componentDidMount() {
    this.autoHeight();
    //监听窗口改变
    window.addEventListener('resize', this.autoHeight);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.autoHeight);
  }
  //计算容器宽度
  autoHeight = () => {
    this.outsideWidth = this.outside.current.offsetWidth - 320;
    this.insideWidth = this.inside.current.offsetWidth - 60;
    this.count = Math.ceil(this.insideWidth / this.outsideWidth);
    if (this.insideWidth > this.outsideWidth) {
      this.setState({ icon: true, length: 0, index: 0 });
    } else {
      this.setState({ icon: false, length: 0, index: 0 });
    }
  };
  //左
  goToLeft = () => {
    if (this.state.index <= 0) {
      return;
    }
    this.setState(
      (state, props) => {
        return {
          index: state.index - 1,
        };
      },
      () => {
        this.setState((state, props) => {
          return {
            length: -state.index * this.outsideWidth,
          };
        });
      },
    );
  };
  //右
  goToRight = () => {
    if (this.state.index >= this.count - 1) {
      return;
    }
    this.setState(
      (state, props) => {
        return {
          index: state.index + 1,
        };
      },
      () => {
        this.setState((state, props) => {
          return {
            length: -(state.index * this.outsideWidth),
          };
        });
      },
    );
  };
  render() {
    const {
      list,
      activekeys,
      clicktab,
      clickclose,
      closeable,
      ...others
    } = this.props;
    const { icon, length } = this.state;
    return (
      <Fragment>
        <div className="tab-line" {...others}>
          {icon ? (
            <LeftOutlined
              onClick={this.goToLeft}
              style={{ fontSize: '12px', color: '#837f7f' }}
            />
          ) : (
            ''
          )}
          <div className="tab-container" ref={this.outside}>
            <ul
              className="go-move"
              ref={this.inside}
              style={{ transform: `translateX(${length}px)` }}
            >
              {list.map((v) => (
                <li
                  key={v.key}
                  className={activekeys === v.key ? 'selected' : ''}
                  onClick={() => clicktab(v.key, v)}
                >
                  {v.title}
                  {closeable ? (
                    <span
                      className="ant-dropdown-link"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clickclose(v.key, v);
                      }}
                    >
                      <CloseOutlined style={{ fontSize: '12px' }} />
                    </span>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          </div>
          {icon ? (
            <RightOutlined
              onClick={this.goToRight}
              style={{ fontSize: '12px', color: '#837f7f' }}
            />
          ) : (
            ''
          )}
        </div>
      </Fragment>
    );
  }
}
export default Tab;

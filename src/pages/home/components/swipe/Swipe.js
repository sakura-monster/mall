import React from "react";
import { Carousel} from 'antd-mobile';
import './swipe.css'

export default class Swipe extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      imgHeight: 176,
    };
  }

  render() {
    return (
      <div className='swipe'>
        <Carousel
          autoplay={true}
          infinite
        >
          {this.props.swipeList.map(item => (
              <img
                key={item.id}
                src={this.$url + item.img}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
          ))}
        </Carousel>
      </div>
    );
  }
}
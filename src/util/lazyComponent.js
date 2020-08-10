import React from "react";
export default function lazyComponent(fn) {
  class com extends React.Component{
    constructor(props){
      super(props);
      this.state={
        C:null
      }
    }
    componentWillMount() {
      fn().then(module=>{
        this.setState({
          C:module.default
        })
      })
    }
    render() {
      const {C} = this.state;
      return (
        <div>
          {C?<C {...this.props}/>:null}
        </div>
      )
    }
  }
  return com
}
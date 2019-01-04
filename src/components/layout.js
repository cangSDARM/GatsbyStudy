import React from 'react' //必须要用. JSX需要

// import { Component } from 'react'
//     表示加载Component包. 只需Component即可, 而不是使用React.Component

//GraphQL： 查询语言; 将数据提取到网站
import { StaticQuery, graphql } from 'gatsby'

//动画样式插件. github自己下
import { CSSTransition } from 'react-transition-group'

import Store from './store/store.js'

//标准写法
class App extends Component{
  //构造函数
  constructor(props){
    //调用父类构造函数
    super(props);
    //组件状态: 存储字段
    //只要数据变化, 相应的页面也会变化
    this.state = Store.getState();  //通过Store获取数据. 其它一样
    Store.subscribe();    //订阅Store的变化
    this.fun = this.fun.bind(this)  //推荐通过在构造函数中绑定对象

  }
  componentDidMount(){
    //ajax模块: import 'axios'. (得自己下)
    //axios.get('xxx')
    //      .then((resources)=>{})  //接收成功
    //      .catch(()=>{})  //接收失败
    //在thunk后：
    //    const action = Ajax()
    //    store.dispatch(action)  Ajax()被执行
    //在saga后:
    //    const action = Ajax()
    //    store.dispatch(action)
    console.log("ajax数据通常在这里接收");
  }
  render(){
    //return里是JSX
    //可以将render函数和其它函数拆分为父子两个组件
    //    父控制逻辑, 子显示UI
    //    此时子组件就是无状态组件: const child = (props) => {}
    //    调用父组件传递的东西不用 this.props, 用 props
    //所有元素必须包括在一个标签里.
    //    或者使用 import { Fragment } form 'react', <Fragment></Fragment>来占位
    return (
      <div>
        <input
          {/* { 表示里面是js或css的原生对象 } */}
          className = 'input'   {/*React中, class使用className代替*/}
          value = {this.state.inputValue}   {/*使用存储的字段, 方法甚至注释: 需要加{}*/}
          onChange = {this.fun}   {/*React的按键事件等和原生类似, 但命名封装为驼峰规则*/}
          {/*绑定事件需要传参时: onChange={()=>this.fun(参数)} */}
          dangerouslySetInnerHTML={{__html: this.state.inputValue}}   {/*不对html标签转义. 也不用在InnerHTML中填值*/}
          ref={(input)=>{ this.input = input }}   {/*ref引用.(尽量不用) 对该DOM结点标记一个引用. 参数为该结点*/}
        />
        <ul>
          {this.getItem()}
        </ul>
        Hello World
      </div>
    );
  }
  getItem(){
    return (
      this.state.list.map((item, index)=>{  //map: 对可迭代对象进行循环
        /*对于react的循环渲染, 需要对每一项最外层标签增加一个key值*/
        /*key值类型是不确定的, 可以是int也可以是string*/
        return <li key={item}>{item}</li>
      })
    )
  }
  //自定义方法 //推荐写法
  fun1 = (value)=>{
    //这种可以不用 bind(this), 直接调用

    //[value]: 动态属性设置.
    //setState: 不需要Callback的写法
    this.setState({
      [value]: true,
    })

    //obj.fun 等价于 obj['fun']
  }
  //自定义方法
  fun(e){  //e: 事件对象. 有ref时可用 this.xxx 替换 e.target
    //事件绑定时需要bind(this)才能在方法中调用this
    //通过bind(this, ...)来传递参数

    //有Redux后, 使用action. 不要使用该内容(除非影响范围只有这个组件)
    //方法中无法直接对this.state赋值, 需要使用this.setState
    //闭包
    const value = e.target.value;
    const list = [...this.state.list, this.state.inputValue]
    this.setState(()=>({    //异步函数. 有可能造成无法访问e.target的状况, 使用闭包解决
      inputValue: value,
      list: list
    })  //这个 () 是ecs6中对return的简写
    ,()=>{
      //Callback函数
    }
    )

    //标准写法
    this.setState((prevState)=>{
      const list = [...prevState.list]
      return {list}
    })
    /*this.setState((prevState)=>{})    可以接收前一次state状态*/
  }
}
export default Layout

//React-redux写法. 推荐
//不用 import Store 了
import { connect } from 'react-redux'
//扩展写法. lambda
const App () => <div>Hello World</div>
const MapState2AppProps = (state)=>{
  return{
    inputValue: state.inputValue    //将自己的inputValue映射为state的inputValue
    //使用 this.props.inputValue调用
  }
}
const MapDispatch2AppProps = (dispatch)=>{
  return{
    fun(e){
      //和上面的fun()一样效果
      //调用: this.props.fun
      //不需要bind(this)
      const action = {type:"", value:1}
      dispatch(action)
    },
    fun2(e){}
  }
}
//连接映射方法和组件
export default connect(MapState2App, MapDispatch2AppProps)(App)
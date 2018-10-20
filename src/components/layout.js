import React from 'react' //必须要用. JSX需要

// import { Componet } from 'react'
//     表示加载Component包. 只需Compnoet即可, 而不是使用React.Compnoet

//GraphQL： 查询语言; 将数据提取到网站
import { StaticQuery, graphql } from 'gatsby'

//动画样式插件. github自己下
import { CSSTransition } from 'react-transition-group'

import Store from './store/store.js'

/*
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)
*/

//标准写法
class App extends Componet{
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
    console.log("ajax数据通常在这里接收");
  }
  render(){
    //return里是JSX
    //可以将render函数和其它函数拆分为父子两个组件
    //    父控制逻辑, 子显示UI
    //    此时子组件就是无状态组件: const child = (props) => {}
    //所有元素必须包括在一个标签里.
    //    或者使用 import { Fragment } form 'react', <Fragment></Fragment>来占位
    return (
      <div>
        <input
          {/* {{ 表示里面是js或css的原生对象 }} */}
          className = 'input'   {/*React中, class使用className代替*/}
          value = {this.state.inputValue}   {/*使用存储的字段, 方法甚至注释: 需要加{}*/}
          onChange = {this.fun.bind(this)}   {/*React的按键事件等和原生类似, 但命名封装为驼峰规则*/}
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
  //自定义方法
  fun(e){  //e: 事件对象. 有ref时可用 this.xxx 替换 e.target
    //事件绑定时需要bind(this)才能在方法中调用this
    //通过bind(this, ...)来传递参数
    //方法中无法直接对this.state赋值, 需要使用this.setState

    //闭包
    const value = e.target.value;
    const list = [...this.state.list, this.state.inputValue]  //... 展开运算符. 相当于py的unzip()
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
    console.log(e);
  }
}
//扩展写法. lambda
const App () => <div>Hello World</div>

export default Layout
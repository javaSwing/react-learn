import React from 'react'
import ReactDOM from 'react-dom'

class ToDo extends React.Component {
    handleRemove = (e)=> {
        this.props.onRemove(e)
    }

    render() {
        if(this.props.index %2 === 0) {
            return (
            <li style={{color: 'blue'}}>hello, {this.props.content} 
                <span style={{display: 'inline-block',marginLeft: '8px', cursor: 'pointer'}} onClick={this.handleRemove}>x</span>
            </li>)
        } else {
            return (
            <li>hello, {this.props.content}
             <span style={{display: 'inline-block',marginLeft: '8px', cursor: 'pointer'}} onClick={this.handleRemove}>x</span>
            </li>)
        }
       
    }
}


function Tips (props) {
    let refDiv = null
    return (<div onClick={(e) => props.onTipsClick(refDiv,e)} 
            ref={(element) => refDiv = element}>tips: {props.text}</div>)
}

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            nowTodo: '',
            todoList: []
        }
        this.myRef = React.createRef()
    }

    componentDidMount () {
        const todoList = [
            '李白',
            '杜甫', 
            'javaSwing'
        ]
        this.setState({
            todoList
        })
        // this.timer = setTimeout(() => {
        //     this.setState({
        //         todoList
        //     }, () => {
        //         console.log(this.myRef.current)
        //     })
        // }, 2000)
       
    }

    componentWillUnmount () {
        // this.timer && clearTimeout(this.timer)
    }

    // 绑定this
    handleInputChange = (e) => {  
        this.setState({
            nowTodo: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newTodoList = this.state.todoList.concat(this.state.nowTodo)
       this.setState({
           todoList: newTodoList,
           nowTodo: ''
       })
    }

    handleRemoveTodo = (index, e) => {
        this.state.todoList.splice(index, 1)
        this.setState({
            todoList:  this.state.todoList
        })
    }

    handleTipClick = (ref, e) =>{
        console.log(ref)
        console.log(e)
    }

    render () {
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                <input value={this.state.nowTodo} type="text" onChange={this.handleInputChange}/>
                <button type="submit">提交</button>
                </form>
                <ul>
                    {
                        this.state.todoList.map((item, index) => {
                            return <ToDo ref={this.myRef} onRemove={e =>this.handleRemoveTodo(index, e)} key={index} index={index} content={item}></ToDo>
                        })
                    }
                </ul>
                <Tips onTipsClick={this.handleTipClick} text={'这是一个提示'}/>
            </div>            
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('root'))


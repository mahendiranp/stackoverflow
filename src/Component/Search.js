import React from 'react'

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({"text":e.target.value})
    }
    handleSubmit(){
                this.props.onChange(this.state.text)

    }
    render(){
        return(
            <div className="mt-5 d-flex">
                <input type="text" className="form-control form-control-lg d-inline" onChange={this.handleChange} placeholder="Search" />
                <button onClick={this.handleSubmit} className="btn btn-dark">Submit</button>
            </div>
        )
    }
}

export default Search
import React from 'react'
import axios from 'axios'

import ListComponent from './Component/ListComponent'
import Search from './Component/Search'


class SeachPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            listData : [],
            page: 1,
            loading: false,
            prevY: 0,
            text: ""
        }
        this.handleListSync = this.handleListSync.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }
    getListData(value){
        axios.get(`https://api.stackexchange.com/2.1/questions?fromdate=1530403200&page=${this.state.page}&pagesize=20&order=asc&sort=activity&tagged=${value}&site=stackoverflow`).then((res) => {
            console.log(res)
            this.setState({
                listData: [...this.state.listData, ...res.data.items],
                page: this.state.page + 1
            })
        })
    }
    handleListSync(value){
        this.setState({page:value})
        this.getListData(this.state.text)
    }
    handleSearch(value){
        this.setState({text: value, listData: []})
        this.getListData(value)
    }
    render(){
        return(
            <div className="container">
                <Search onChange={this.handleSearch}/>
                <ListComponent listData={this.state.listData}  handleListSync={this.handleListSync}/>
            </div>
        )
    }
}

export default SeachPanel
import React from 'react'
import axios from 'axios'


import CustomModal from './CustomModal'
import DateConversion from './DateConversion'


class ListComponent extends React.PureComponent {
   constructor(props) {
    super(props);
    this.state = {
      listData: [],
      page: 1,
      loading: false,
      prevY: 0,
      show: false,
      selectedValue: []
    };
    this.showModal = this.showModal.bind(this)
    this.handleRowSelect = this.handleRowSelect.bind(this)
  }

  componentDidMount() {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentDidUpdate(prevsProp){
      if(this.props.listData !== prevsProp.listData){
          this.setState({listData:this.props.listData})
      }
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.props.handleListSync(2)
      this.setState({ page: this.state.page + 1 });
    }
    this.setState({ prevY: y });
  }

      showModal = e => {
        this.setState({show: false, selectedValue: []})

      };

      handleRowSelect(value){
        console.log(value)
        this.setState({
          show: true,
          selectedValue: value
        })
      }


    render(){

    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return(
            <div>
                <ul className="list-group list-group-flush mt-2">
                    {this.state.listData.map((data, index) => 
                      <div class="list-group my-1" key={index}>
                        <a onClick={this.handleRowSelect.bind(this, data)} class="list-group-item list-group-item-action text-left">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{data.title}</h5>
                          </div>
                          <div className="d-flex">
                          <small><span className="font-weight-bold">Author:</span> {data.owner.display_name}</small>
                          <small className="ml-auto "><DateConversion date={data.creation_date}/></small>
                          </div>
                        </a>
                      </div>)}
                </ul>
                <div ref={loadingRef => (this.loadingRef = loadingRef)}  style={loadingCSS}>
                    <span  style={loadingTextCSS}>Loading...</span>
                </div>
                <CustomModal onClose={this.showModal} show={this.state.show}>
                 <div class="card border-0">
                  <div class="card-body p-0 text-left">
                    <h5 class="card-title">{this.state.selectedValue.title}</h5>
                    <div className="d-flex">
                    <a href={this.state.selectedValue && this.state.selectedValue.owner && this.state.selectedValue.owner.link} class="card-link" target="_blank"><span className="font-weight-bold">Author:</span> {this.state.selectedValue && this.state.selectedValue.owner && this.state.selectedValue.owner.display_name}</a>
                    <a href={this.state.selectedValue.link} class="ml-auto card-link" target="_blank">Read more</a>
                    </div>
                  </div>
                </div>
                </CustomModal>
            </div>
        )
    }
}

export default ListComponent

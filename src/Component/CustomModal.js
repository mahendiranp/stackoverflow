import React from 'react'

class CustomModal extends React.PureComponent {
 onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
      console.log(this.props)
    if (!this.props.show) {
      return null;
    }
    return (
      <div class={"modal " + (this.props.show ? "modal-open  d-block": "")} id="modal">
        <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Detailed</h5>
        <button type="button" class="close" data-dismiss="modal"  onClick={this.onClose} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        {this.props.children}
      </div>
    </div>
  </div>
      </div>
    );
  }

}

export default CustomModal
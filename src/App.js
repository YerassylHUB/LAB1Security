import { Component } from 'react';
import TypeList from './components/typeList';
import EncArea from './components/encArea';


export default class App extends Component{

  state = {
    selectedItem: 1
  }


  onItemSelected = (id) => {
    this.setState({
      selectedItem: id
    })
  }

  render(){
    const {selectedItem} = this.state; 

    return (
      <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <TypeList onItemSelected={this.onItemSelected}/>
          </div>
          <div className="col-md-9">
            <EncArea selectedItem={selectedItem} />
          </div>
        </div>
      </div>
      </>
    )
  }
}

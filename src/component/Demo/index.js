import React, { Component, Fragment } from 'react'
import Select from 'react-select';
export default class Demo extends Component {
    state = {
        start:{label:"", value:-1},
        end:-1,
        options1:[],
        options2:[],
        startEndArr:[]
      };

        componentDidMount(){
          let options1 = this.state.options1.slice()
          let options2 = this.state.options2.slice()
            for(let i=0; i<24; i++){
                options1.push({label:i, value:i})
            }
            for(let i=1; i<=24; i++){
                options2.push({label:i, value:i})
            }
            this.setState({
                options1,
                options2
            })
        }

        onChangeHandler = (val, name) => {
            if(name === "start"){
                let options2 = this.state.options2.slice(0)

                // if(this.state.startEndArr.length > 0){
                //     this.state.startEndArr.map((temp, i) => {
                //         this.state.options2.filter((el, index) => { 
                //             if(temp.startTime < el.value && el.value <= temp.endTime){
                //                 el.isDisabled = true
                //             }
                //             else{
                //                 el.isDisabled = false
                //             }
                //            return el
                //         })
                //         return temp
                //     })

                // } 

               
                    options2.map((item, index) => {
                        console.log(this.state.start.value, 'start value')
                        
                        if(this.state.start.value === -1 && item.value <= val.value){
                            console.log(item.value, 'inside if block')
                            item.isDisabled = true
                        }
 
                        // else{
                        //     item.isDisabled = false
                        // }

                        if(this.state.start.value > val.value
                          
                            && item.value >= val.value  
                            && item.value < this.state.start.value){ 
                                item.isDisabled = false
                                console.log(item.value, 'inside 2nd if block')
                        }
                        // else{
                        //     item.isDisabled = true
                        //     console.log(item.value, 'inside if else')
                        // }
                    
                        return item
                    
                    })
               
                    
                
                this.setState({
                    start: val,
                    options2
                })
            }


            else{
                let options1 = this.state.options1.slice(0)
                options1.map((item, index) => {
                    if(this.state.start.value - 1 <= item.value   && item.value <= val.value){
                        item.isDisabled = true
                    }
                return item
                })

                this.setState({
                    end:val,
                    options1
                }) 
            }
        }

        createStartTimeEndTimeobj = () => {
            let startEndArr = this.state.startEndArr.slice(0)
            startEndArr.push({startTime:this.state.start.value, endTime:this.state.end.value})
            this.setState({
                startEndArr,
                start:'',
                end:''
            })
        }
      
      render() {
        return (
            <div className='container'>
                <div className="d-flex">
                    <div className="col-md-6">
                        <Select options={this.state.options1}
                        placeholder="Start Time"
                        onChange={(value, action) => this.onChangeHandler(value, action.name)}
                        name="start"
                        value={this.state.start}
                        />
                    </div>
                    <div className="col-md-6">
                        <Select options={this.state.options2}
                        placeholder="End Time"
                        onChange={(value, action) => this.onChangeHandler(value, action.name)}
                        name="end"
                        value={this.state.end}
                        />
                    </div>
                    <button className="btn btn-success" onClick={() => this.createStartTimeEndTimeobj()}>Add</button>
                 </div>
                {
                    this.state.startEndArr.length > 0 ?
                    
                        this.state.startEndArr.map((item, index) => {
                            return (
                             
                            <div className="d-flex">
                                <div class="form-group col-md-4">
                                    <label htmlFor="start">selected start time</label>
                                    <input type="email" class="form-control" id="start" value={item.startTime}/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label htmlFor="end">selected end time</label>
                                    <input type="text" class="form-control" id="end" value={item.endTime}/>
                                </div>
                                <button className="btn btn-success" style={{height:"30px", padding:"3px 10px", marginTop:"35px"}}>Edit</button>
                                <button className="btn btn-danger" style={{height:"30px", padding:"3px 10px", marginTop:"35px", marginLeft:"5px"}}>Delete</button>
                        </div>  )}) 
                            
                            : 
                        <div style={{marginTop:"20px"}}> No start end time found!!!!</div>
                    
                           
                    
                }
                 
            </div>
         
        );
      }
}

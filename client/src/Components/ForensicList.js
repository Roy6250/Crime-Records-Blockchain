import React, { Component,useState} from 'react';
import {Row, Col} from "react-bootstrap"
import ViewCase from './ViewCase';
import {Link} from 'react-router';
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import contract_abi from "../abi/contract_2.json"

import { ethers } from "ethers";
import Web3Modal from "web3modal";

import '../CSS/policeList.css';

class ForensicList extends Component{

    state = {
        id:[],
        timestamp:[],
        offense:[],
        description:[],
        loading:false,
        
    }

   
    componentDidMount = async () => {

        let contractAddress="0x124935Da239B1cD63B1b6b63e6dF50f31B18CF35"

        let signer;
		let tx;
		let contract;
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			signer = provider.getSigner();

			try {
				contract = new ethers.Contract(contractAddress, contract_abi, signer);

        
        try{
          const tx= await contract.getCrimeCount();

            let count=parseInt(tx._hex,16);

           for (let i=1;i<=count;i++ )
           {
                const tx_1= await contract.getCrimeBlock(parseInt(i))
                this.setState((prev)=>{
                    return {
                    id:[...prev.id, parseInt(tx_1[0],16)],
                    timestamp:[...prev.timestamp, tx_1[1]],
                    offense:[...prev.offense,tx_1[2]],
                    description:[...prev.description, tx_1[3]]
                    };
                });

           }
           console.log(this.state);
            

        var details = this.state.details;
        for (var key in details) {
            this.setState((prev)=>{
                return {
                
                arr:[...prev.arr, details[key]]
                };
            });

            
        }


        this.setState(()=>{return {loading:true};})
          
          //console.log();

          }catch(error){
              console.log(error);
          }
  
		} catch (error) {
			console.log(error);
		}
  }catch (error) {
    console.log(error);
  }
        
      };

      

      async onSubmit(event){
        

      }

   /* render() {

        var arr=[]
        var details = this.state;
            for (var key in details) {
                console.log(details[key])
                arr.push(details[key]);
            }

        arr=[[1,2,3],[4,3,5]]
        
        if (arr.length>0){
         return(
            arr.map((x)=>{return (
                <Col>
                    {x.map((y)=>{
                      return (
                        <Row>{y}</Row>
                      )
                    })}
    
                </Col>
                    
                    
                    
                  )})
         )
                }
    }

    clicked = (clicked) =>
    {
        this.setState({
            getDetailsOf : clicked
        })

    }   
}

*/
render(){

    if (this.state.loading){
        //console.log(this.state.arr)
        var arr=[]
        var details = this.state;
            for (var key in details) {

                if (key != "loading")
                {

                //console.log(details[key])
                 arr.push(details[key]);
                }
            }
        var fina=[]
        for(let i=0;i<2;i++)
        {
            var temp=[]
            for(let j=0;j<arr.length;j++)
            {
                temp.push(arr[j][i])

            }
            fina.push(temp)
            
        }
        console.log(fina)

        if (arr.length>0){
        console.log(arr);
        
        return(
            <div className="card">
            <div className="row listItem">
                {arr.map((x) => {
                return (
                    <div className="col s3 black-text">
                    {x.map((y) => {
                        return <div className="row listItem">{y}</div>;
                    })}
                    </div>
                );
                })}
            </div>
            </div>
        )
    }
    }
    else{
        return(
            <h1> loaded</h1>
        )
    }
}
}
export default ForensicList;
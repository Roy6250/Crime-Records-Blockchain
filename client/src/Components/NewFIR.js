import React, { Component } from 'react';
import '../CSS/newFIR.css';
import GenericNavbar from './Navbar/GenericNavbar';
import contract_abi from "../abi/contract_2.json"
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { create } from 'ipfs-http-client'
const ipfs = create('https://ipfs.infura.io:5001/api/v0')

class NewFIR extends Component
{
    state = {buffer: null, web3: null, accounts: null,
        crime_id: '',
        timestamp: '',
        offense_code: '',
        description: ''
    };

    
    constructor(props)
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();           
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();      
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          console.log(deployedNetwork);    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance }, this.runExample);
          this.onGetDate();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };
      captureFile = (event) =>{
        event.preventDefault()
        //console.log("File captured......")
        const file= event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () =>{
          console.log('buffer', Buffer(reader.result))
          this.setState({buffer: Buffer(reader.result)})
        }
    
      }
    
    async onSubmit(event) {
        const { accounts, contract } = this.state;
        event.preventDefault()
        this.onGetDate();
        console.log("Submitting the form...")
        const hash= await ipfs.add(this.state.buffer)
        const url = `https://ipfs.infura.io/ipfs/${hash.path}`
        console.log(hash.path)
        let signer;
        let contract_;
        const contract_add='0x124935Da239B1cD63B1b6b63e6dF50f31B18CF35'

		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		signer = provider.getSigner();
		const wallet = await signer.getAddress();
        console.log(wallet)
        contract_ = new ethers.Contract(contract_add, contract_abi, signer);
        console.log(contract_);
        //contract.methods.addCrimeReport(this.state.crime_id, this.state.timestamp, this.state.offense_code, this.state.description).send({from: accounts[0]});

        const tx= await contract_.addCrimeReport(this.state.crime_id, this.state.timestamp,  this.state.description,hash.path);
        
    }

    onGetDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        var hour = (date.getHours() + 100).toString().substring(1); 
        var mins = (date.getMinutes() + 100).toString().substring(1);
        var sec = (date.getSeconds() + 100).toString().substring(1);    
        this.setState({
            timestamp : year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec
        });
        // console.log(year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec);
      }

    render()
    {
        return(
            <div className = "">
                <GenericNavbar/>
                <div className="container">
                <div className="row">
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle2">
                                <h4 className = "cardTitle">New FIR</h4>
                            </div>
                            <div className="card-content">
                                <form onSubmit={this.onSubmit}>
                                    <div className="input-field">
                                        <input type="text" id="caseId" onChange={(evt) => { this.state.crime_id =  evt.target.value; }} required/>
                                        <label htmlFor="email">Case ID</label>
                                    </div>
                                    <div className="input-field">
                                        <input value={this.state.timestamp} type="text" id="timestamp" readOnly onChange={(evt) => { this.state.timestamp =  evt.target.value; }} required/>
                                        {/* <label htmlFor="email">Time Stamp</label> */}
                                    </div>
                                    <div className="input-field">
                                        <input type="text" id="offCode" onChange={(evt) => { this.state.offense_code =  evt.target.value; }} required/>
                                        <label htmlFor="offCode">Offense Code</label>
                                    </div>

                                    <div className="form-submit center">
                                        <button type="submit" className="dropbtn1" style={{marginTop:"10px"}}>Upload to Blockchain</button>
                                        <input type='file' onChange={this.captureFile} />
                                        
                                    </div>
                                    
                                </form> 
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle">
                                <h4 className = "cardTitle">Enter Description</h4>
                            </div>
                            <div className="card-content">
                                <div className="input-field ">
                                    <textarea id = "report"  className = "textAreaHeight" onChange={(evt) => { this.state.description =  evt.target.value; }} required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default NewFIR;
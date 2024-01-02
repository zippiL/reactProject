import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";

class ServiceStore {
    baseURL = "http://localhost:8787/services";
    data = [];
    tempData = [{
       
        name: "Personal training:",
        description:
            "Personal training service provides a personal and customized training and fitness experience. A personal trainer can develop a personalized training plan, teach proper exercise techniques, and provide unique and customized support for each client.",
        price: 450,
        duration: 45,
        img:"https://1click2buy.co.il/wp-content/uploads/2023/11/designing-a-home-gym-1.jpg"
    }
        ,
    {
        
        name: "Writing nutrition plans:",
        description:
            "This service includes personal nutritional counseling and writing nutrition plans adapted to the personal needs of each client. The diet is designed to support fitness goals, improve exercise efficiency, and provide ongoing nutritional advice.",
        price: 300,
        duration: 20,
        img:"https://www.hagits.com/wp-content/uploads/2019/05/hagits_diet-780x480.jpg"
    },
    {
        
        name: "Group trainings:",
        description:
            "In addition to personal training, this service focuses on group training that takes place in small groups. The group approach can provide inspiration, social support, and a positive competitive atmosphere.",
        price: 200,
        duration: 45,
        img:"https://cdn.spacenter.co.il/wp-content/uploads/2020/10/%D7%97%D7%9C%D7%9C%D7%99-%D7%A2%D7%91%D7%95%D7%93%D7%94-%D7%A2%D7%9D-%D7%97%D7%93%D7%A8-%D7%9B%D7%95%D7%A9%D7%A8.jpg"
    },
    {
        
        name: "Mobile home visits:",
        description:
            "This service offers the trainer to come directly to the client's home and provide the training services in the client's private environment. Mobile home visits allow the client to practice comfortably and devote more time to training.",
        price: 500,
        duration: 45,
        img:"https://irisela.co.il/wp-content/uploads/2021/05/Untitled-design-47.png"
    }];

    constructor() {
        makeObservable(this, {
            data: observable,
            addService: action
        });
        this.fetchData();
    }
    init() {
        this.tempData.map(x => this.addService(x));
    }
    fetchData() {
         
        axios.get("http://localhost:8787/services").then(res => {
            runInAction(() => {
                this.data = res.data;
                if(this.data.length==0){
                    this.init();
                }
            })
        })
    }



    addService(service) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/service", service)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.data.push(service);
                        });
                    } else {
                        console.error("Meeting was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); // Resolve with the status code
                })
                .catch((error) => {
                    console.error("Error adding meeting:", error);
                    reject(error); // Reject with the error for further handling
                });
        });
    }
    
}


export default new ServiceStore;
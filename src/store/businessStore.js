import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

class BusinessStore {
    baseURL = "http://localhost:8787/businessData";
    data = {
    };
    tempData = {
        name: "FITFLEX",
        address: "123 Broadway, New York, NY 10001",
        phone: "03-1234567",
        owner: "John Fitness",
        logo: "https://drive.google.com/uc?export=view&id=1LkY7JhCBrKJQ_GpRN4Xdm_p0k8MJ84H2",
        description: "Transform your body"
    }


    constructor() {
        makeObservable(this, {
            data: observable,
            editDetail: action,
        });
        this.fetchData();
    }

    fetchData() {
        axios.get("http://localhost:8787/businessData").then(res => {
            runInAction(() => {
                this.data = res.data;
                if (this.data.name == undefined)
                    this.editDetail(this.tempData)
            });
        });
    }

    editDetail(business) {
        axios.post("http://localhost:8787/businessData", business).then(
            runInAction(() => {
                this.data = business;
            })
        );
    }
}

export default new BusinessStore();

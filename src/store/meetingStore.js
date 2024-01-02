import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
class MeetingStore {
    baseurl = ""
    data = [];
    tempData = [
        { "dateTime": "2024-01-01T16:30", "serviceName": "Consultation", "name": "John Doe", "phone": "0555555555", "email": "john@example.com" },
        { "dateTime": "2024-01-05T10:00", "serviceName": "Massage", "name": "Jane Smith", "phone": "0666666666", "email": "jane@example.com" }
        , { "dateTime": "2024-01-10T15:45", "serviceName": "Yoga class", "name": "Alex Johnson", "phone": "0777777777", "email": "alex@example.com" }

    ];
    constructor() {
        makeObservable(this, {
            data: observable,
            addMeeting: action
        });
        this.fetchData();
    }
    init() {
        this.tempData.map(x => this.addMeeting(x));
    }
    fetchData() {
        axios.get("http://localhost:8787/appointments").then(res => {
            runInAction(() => {
                this.data = res.data;
                if(this.data.length==0){
                    this.init();
                }
                this.data.replace([...this.data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)));

            });
        });
    }
    addMeeting(meeting) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/appointment", meeting)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.data.push(meeting);
                            this.data.replace([...this.data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)));

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
export default new MeetingStore;
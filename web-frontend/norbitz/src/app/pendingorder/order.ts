export class Order {
    constructor() { }

    orderPlaced: boolean = false;

    origin: string;
    desination: string;
    startDate: string;
    endDate: string;
    port: string;
    bookingType: string;

    transCarId: any;
    transCarData = {};
    transCarCostPerDay:number = 0.0;
    transCarComplete:OrderStatus = OrderStatus.pending;

    extraCarId: any;
    extraCarData = {};
    extraCarCostPerDay:number = 0.0;
    extraCarComplete:OrderStatus = OrderStatus.pending;

    homestayId: string;
    homestayData = {};
    homestayCost: number;
    homestayComplete:OrderStatus = OrderStatus.pending;

    funIds: Set<string> = new Set<string>();
    funDataAll: any;
    funIdsArr: string[] = [];
    funCompleteKV = {};

    selectedFlightId: any;
    selectedFlightData = {};
    selectedFlightPrice: number = 0.0
    flightComplete:OrderStatus = OrderStatus.pending;;

    selectedTicketId: any;
    

    savedTotalCost: number = 0.0;

    selectedCruiseId: any;
    selectedCruiseData = {};
    selectedCruisePrice: number = 0.0;
    cruiseComplete:OrderStatus = OrderStatus.pending;

    get startDateDate():Date {
        return new Date(this.startDate);
    }

    get endDateDate():Date {
        return new Date(this.endDate);
    }

    get daysDuration():number {
        return Math.max(1,this.msToDays(this.endDateDate.valueOf() - this.startDateDate.valueOf()));
    }

    get calculatedTotalCost():number {
        var total: number = 0;
        let startDateDateObj:Date = new Date(this.startDate);
        if(this.transCarId){
            total += this.transCarCostPerDay * this.daysDuration;
        }
        if(this.extraCarId){
            total += this.extraCarCostPerDay * this.daysDuration;
        }
        this.funIds.forEach((activityName)=>{
            var funData = this.funDataAll.find((val)=>val.name==activityName);
            total += funData.cost;
        });
        if(this.selectedCruiseId){
            total += this.selectedCruisePrice;
        }
        if(this.homestayId){
            total += this.homestayCost * this.daysDuration;
        }
        if(this.selectedFlightId) {
            total += this.selectedFlightPrice;
        }
        this.savedTotalCost = total;
        return total;
    }

    private msToDays(seconds: number):number {
        return Math.ceil(seconds/1000/60/60/24);
    }

    public updateFunIdsArr(){
        this.funIdsArr = Array.from(this.funIds);
    }

    public isFunIdComplete(id){
        if(this.funCompleteKV[id]){
            return this.funCompleteKV[id];
        }else{
            return OrderStatus.pending;
        }
    }

}

export enum OrderStatus {
    pending = 0,
    sent = 1,
    success = 2,
    error = 3,
}

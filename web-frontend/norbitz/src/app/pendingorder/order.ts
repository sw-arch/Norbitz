export class Order {
    constructor() { }

    origin: string;
    desination: string;
    startDate: string;
    endDate: string;

    transCarId: any;
    transCarData = {};
    transCarCostPerDay:number = 0.0;

    extraCarId: any;
    extraCarData = {};
    extraCarCostPerDay:number = 0.0;

    funIds: Set<string> = new Set<string>();
    funDataAll: any;
    funIdsArr: string[] = [];

    savedTotalCost: number = 0.0;
    
    get startDateDate():Date {
        return new Date(this.startDate);
    }

    get endDateDate():Date {
        return new Date(this.endDate);
    }

    get daysDuration():number {
        return this.msToDays(this.endDateDate.valueOf() - this.startDateDate.valueOf());
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
        this.savedTotalCost = total;
        return total;
    }

    private msToDays(seconds: number):number {
        return Math.ceil(seconds/1000/60/60/24);
    }

    public updateFunIdsArr(){
        this.funIdsArr = Array.from(this.funIds);
    }

}
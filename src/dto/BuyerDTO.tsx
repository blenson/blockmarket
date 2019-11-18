// TypeScript but not really used yet. 

export default class BuyerDto {
    _id?: string;
    username : string = "";
    email : string = "";
    authid?: string;
    phone? : string;
    address? : {
        postOfficeBox : string;
        street1 : string;
        street2 : string;
        locality : string;    // e.g. city
        region : string;      // e.g. province/state
        country : string;
        postCode : string;
    };
    purchases? : [{
        id : string;
        name : string;
        date : Date;
        quantity : Number;
        price : Number;
    }]
}

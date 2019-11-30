// TypeScript but not really used yet.

export default class OrderDto {
    _id?: string;
    orderDate?: Date;

    merchantId?: string;
    storeId?: string;

    buyerName?: string;
    buyerId?: string;
    shipTo?: {
        postOfficeBox: string;
        street1: string;
        street2: string;
        locality: string; // e.g. city
        region: string; // e.g. province/state
        country: string;
        postCode: string;
    };

    status?: string;
    transactions?: [
        {
            statusCode: string; // cancelled, paid, packaging, shipped, delivered, returned
            statusLocation: string;
            statusDesc: string;
            statusDate: string;
        }
    ];

    orderSubTotal?: Number;
    shippingCost?: Number;
    tax1?: Number;
    orderTotal?: Number;
    shippingMethod?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    details?: [
        {
            itemid: string;
            name: string;
            quantity: Number;
            shipping: Number;
            unitprice: Number;
        }
    ];
}

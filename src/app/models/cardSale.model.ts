export class CardSale {
    id: string;
    cardType: string;
    email: string;
    name: string;
    remark: string;
    url: string;
    status: string;
    amount: number;
    replyMsg: string;
    respondImg: File;

    constructor(file: File){
        this.respondImg = file;
    }
}
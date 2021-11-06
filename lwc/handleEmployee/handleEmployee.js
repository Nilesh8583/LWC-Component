import { LightningElement, wire,track } from 'lwc';
import FetchAccount1 from '@salesforce/apex/FetchAccount.FetchAccount1';

export default class HandleEmployee extends LightningElement 
{
    @track accData;
    @track ErrorData;
    @wire(FetchAccount1)
    dataRecord({data,error})
    {
        if(data)
        {
            this.accData=data;
        }
        else if(error)
        {
            this.ErrorData=error;
        }
    }
}
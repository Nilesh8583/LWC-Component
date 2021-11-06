
import { LightningElement, track,wire } from 'lwc';
import getFormData from '@salesforce/apex/ApexClassSample.fetchForm';


export default class Child extends LightningElement {
    @track recordId;
    @wire (getFormData) getForm;

    handleContactDelete(event){
        this.recordId = event.target.value;
        //window.console.log('recordId# ' + this.recordId);
        deleteRecord(this.recordId) 
        .then(() =>{
   
           const toastEvent = new ShowToastEvent({
               title:'Record Deleted',
               message:'Record deleted successfully',
               variant:'success',
           })
           this.dispatchEvent(toastEvent);
   
           return refreshApex(this.getForm);
           
        })
        .catch(error =>{
            window.console.log('Unable to delete record due to ' + error.body.message);
        });
     }
  
     
}
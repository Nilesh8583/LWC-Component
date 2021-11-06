import { LightningElement, wire,track,api} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import { createRecord } from 'lightning/uiRecordApi';
import EmployeeLWC from '@salesforce/schema/EmployeeLWC__c';
import Name  from '@salesforce/schema/EmployeeLWC__c.Name__c';
import DOB  from '@salesforce/schema/EmployeeLWC__c.DOB__c';
import Last_Name 	 from '@salesforce/schema/EmployeeLWC__C.Last_Name__c';
import Contry 	 from '@salesforce/schema/EmployeeLWC__C.Contry__c';
import State	 from '@salesforce/schema/EmployeeLWC__C.State__c';



export default class EmpFormEx extends LightningElement {
    @wire (getObjectInfo, { objectApiName: EmployeeLWC })
    empInfo;
    @wire(getPicklistValues,{recordTypeId: '$empInfo.data.defaultRecordTypeId', fieldApiName: State })
    slaFieldInfo({ data, error })
    {
        if (data) this.statedata = data;
    }
    @wire(getPicklistValues, {recordTypeId:'$empInfo.data.defaultRecordTypeId', fieldApiName: Contry })
    upsellFieldInfo({ data, error }) 
    {
        if (data) this.Contrydata = data.values;
    }


    EmployeeMetadata;   
    Last_Name ;
    DOB ;
    Name ;
    Contrydata  ;
    Statedata ;

    showpicklist = true;
    empHandle(event) {
        console.log(event.target.label);
        console.log(event.target.value);
        if(event.target.label=='First Name'){
            this.Name  = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.Last_Name  = event.target.value;
        }            
        if(event.target.label=='DOB'){
            this.DOB  = event.target.value;
        } 
        if(event.target.label=='Contry'){
            this.Contry  = event.target.value;
        }   
    }

    insertContactAction()
        {
        const fields = {};
        fields[Name.fieldApiName] = this.Name;
        fields[Last_Name.fieldApiName] = this.Last_Name;
        fields[DOB.fieldApiName] = this.DOB;

        const recordInput = { apiName: EmployeeLWC.objectApiName, fields };
        createRecord(recordInput)
        .then(contactobj=> {
            this.contactId = contactobj.id;
            
            });

    }
    fetchDependentValue(event){
        let key = this.slaFieldData.controllerValues[event.target.value];
        this.Contrydata = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));

    }
   
    
}


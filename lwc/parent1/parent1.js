import { LightningElement ,track, wire} from 'lwc';
import fetchForm from '@salesforce/apex/ApexClassSample.fetchForm';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import { NavigationMixin } from 'lightning/navigation';

export default class parent1 extends NavigationMixin(LightningElement)  {

    @track data;
    @track columns=[{label: 'label',fieldName: 'Name', type: 'text'},
    {label: 'phone',fieldName: 'Phone', type: 'phone'}
];

    @wire (fetchForm) formRecords({error,data}){

        if(data){

            this.data=data;

        }

        else if(error)

        {

            this.data=undefined;

        }



    }

    handleClick(event) {



        event.preventDefault();

        let componentDef = {

            componentDef: "c:Account",         

        };

        // Encode the componentDefinition JS object to Base64 format to make it url addressable

        let encodedComponentDef = btoa(JSON.stringify(componentDef));

        this[NavigationMixin.Navigate]({

            type: 'standard__webPage',

            attributes: {

                url: '/one/one.app#' + encodedComponentDef

            }

        });

}

}
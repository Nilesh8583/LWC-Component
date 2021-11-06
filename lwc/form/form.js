import { LightningElement, track, api } from 'lwc';
import saveForm from '@salesforce/apex/form.saveFormRecord';
import uploadFile from '@salesforce/apex/form.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import Form_Name from '@salesforce/schema/Form_Detail__c.Form_Name__c';
import { NavigationMixin } from 'lightning/navigation';

export default class Form extends  NavigationMixin(LightningElement) {
  @api recordId;
  fileData= '';
  
  @track title = '';
  @track formName  = '';
  @track objType = '';
  @track message = '';
  @track dateAndTime = '';
  @track enablePageNumber = '';
  @track isActive = '';
  @track isDeleted = '';
  @track isEnablePDF = '';
  //@track logo = '';
  @track footerMsg = '';
  @track formRecoreId;value
  @track errorMsg;

  valueHandleChange(event) {
    if (event.target.name == 'titletext') {
      this.title = event.target.;
      window.console.log(typeof this.title);
      window.console.log('value of>>>>>>' + this.title);
      let stringFOrmName = event.target.value;
      this.formName = stringFOrmName.replace(/ /g, "_") + "__c";
      window.console.log(typeof this.formName);
      window.console.log('value of>>>>>>' + this.formName);
    }
    if (event.target.name == 'typeOfObj') {
      this.objType = event.target.value;
      window.console.log(typeof this.objType);
    }
    if (event.target.name == 'Msg') {
      this.message = event.target.value;
      window.console.log(typeof this.message);
    }
    if (event.target.name == 'DandT') {
      this.dateAndTime = event.target.checked;
      window.console.log(typeof this.dateAndTime);
    }
    if (event.target.name == 'Pgnumber') {
      this.enablePageNumber = event.target.checked;
      window.console.log(typeof this.enablePageNumber);
    }
    if (event.target.name == 'active') {
      this.isActive = event.target.checked;
      window.console.log(typeof this.isActive);
    }
    if (event.target.name == 'deleted') {
      this.isDeleted = event.target.checked;
      window.console.log(typeof this.isDeleted);
    }
    if (event.target.name == 'PDF') {
      this.isEnablePDF = event.target.checked;
      window.console.log(typeof this.isEnablePDF);
    }
    /*if (event.target.name == 'loGo') {
      this.logo = event.target.value;
      window.console.log(typeof this.logo);
    }*/
    if (event.target.name == 'FootrMsg') {
      this.footerMsg = event.target.value;
      window.console.log(typeof this.footerMsg);
    }
  }

  openFileUpload(event) {
    const file = event.target.files[0]
    var reader = new FileReader()
    reader.onload = () => {
        var base64 = reader.result.split(',')[1]
        this.fileData = {
            'filename': file.name,
            'base64': base64,
            'recordId': this.recordId
        }
        window.console.log(this.fileData)
    }
    reader.readAsDataURL(file)
}

  handleInsert(event) {

    event.preventDefault();
    let componentDef = {
        componentDef: "c:formDetail",
        attributes: {
          formnamefrmdetail: this.formName
        }
    };
    // Encode the componentDefinition JS object to Base64 format to make it url addressable
    let encodedComponentDef = btoa(JSON.stringify(componentDef));
    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: '/one/one.app#' + encodedComponentDef
        }
    });

    window.console.log(this.fileData)
        const { base64, filename, recordId } = this.fileData
        uploadFile({ base64, filename, recordId }).then(result => {
            this.fileData = null
          })

    saveForm({
      formTitle: this.title, formFormName: this.formName, formObjType: this.objType, fomMessage: this.message,
      formDateAndTime: this.dateAndTime, formEnablePageNumber: this.enablePageNumber, formIsActive: this.isActive, 
      formIsDeleted: this.isDeleted, formIsEnablePDF: this.isEnablePDF, formFooterMsg: this.footerMsg
    })
      .then(result => {
        this.formRecoreId = result.Id;
        window.console.log('formRecoreId==>>> ' + this.formRecoreId);
        this.fileData = null
        const toastEvent = new ShowToastEvent({
          title: 'Success!',
          message: 'Record created successfully',
          variant: 'success'
        });
        this.dispatchEvent(toastEvent);
      })
      .catch(error => {
        this.errorMsg = error.message;
        window.console.log(this.error);
      });

  }
}
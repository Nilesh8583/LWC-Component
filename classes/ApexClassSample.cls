public with sharing class ApexClassSample {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchForm( ){
        return [SELECT Name FROM Account];
    }
}

 
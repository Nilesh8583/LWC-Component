public with sharing class FetchAccount {
    @AuraEnabled(cacheable=true)
    public static List<Account> FetchAccount1( ){
        return [SELECT Name,Email__c  FROM Account where Phone != Null LIMIT 50 ];
    }
}

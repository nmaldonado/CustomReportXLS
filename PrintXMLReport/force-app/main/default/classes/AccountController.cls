public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByEmployeeNumber(Integer numberOfEmployees) {
        return [
            SELECT Name,NumberOfEmployees
            FROM Account
            WHERE NumberOfEmployees >= :numberOfEmployees
        ];
    }


    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByRevenue(Decimal annualRevenue) {
        return [
            SELECT Name,AnnualRevenue
            FROM Account
            WHERE AnnualRevenue >= :annualRevenue
        ];
    }

    @AuraEnabled
    public static List<Account> getAccountsByCountry(String country) {
        
        return [
            SELECT Id, Name,BillingCountry, BillingCity, Phone, AnnualRevenue, NumberOfEmployees, Type
            FROM Account
            WHERE BillingCountry = :country
        ];
    }

    @AuraEnabled
    public static void updatePrimaryContactEmail() {
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
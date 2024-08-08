import { LightningElement, api } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'BillingCountry', fieldName: 'BillingCountry' },
    { label: 'BillingCity', fieldName: 'BillingCity' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue' },
    { label: 'NumberOfEmployees', fieldName: 'NumberOfEmployees' },
];
export default class TableAccounts extends LightningElement {
@api accounts;
columns = columns;

connectedCallback() {
    this.handleAccountsChange();
}

handleAccountsChange() {
    const event = new CustomEvent('accountschange', {
        detail: { accounts: this.accounts }
    });
    this.dispatchEvent(event);
}
}
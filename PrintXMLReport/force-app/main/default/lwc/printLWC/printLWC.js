import { LightningElement, wire } from 'lwc';
import getAccountsbyCountry from '@salesforce/apex/AccountController.getAccountsByCountry';
import { printDocument } from './printBuilder';


const columns = [
    { label: 'Name', fieldName: 'Name', sortable: true},
    { label: 'BillingCountry', fieldName: 'BillingCountry' },
    { label: 'BillingCity', fieldName: 'BillingCity' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue' },
    { label: 'NumberOfEmployees', fieldName: 'NumberOfEmployees' },
    { label: 'Type', fieldName: 'Type' }
];

export default class PrintLWC extends LightningElement {

    accounts;
    countryValue;
    columns = columns;
    tableLoaded = false;
    loading = false;
    isShowModal = false;
    exportData;
    availableFields = [];
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.accounts];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.accounts = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }


    // Used to sort the 'Age' column
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }
    
    async handleSearch() {
        try {
            this.loading= true;
            this.accounts = await getAccountsbyCountry({country: this.countryValue});
            console.log(this.accounts);
            console.log('|||||Call to apex|||||');
            this.tableLoaded = true;
        } catch {
            console.log('error');
        }
        this.loading= false;
    }


    handleCountryChange(event) {
        this.countryValue = event.target.value;
        this.handleSearch();
    }

    get countryOptions() {
        return [
            {label: '--None--', value: ''},
            {label: 'United States', value: 'United States'},
            {label: 'Canada', value: 'Canada'},
            {label: 'Uruguay', value: 'Uruguay'},
        ];
    }

    showModalBox () {
        this.isShowModal = true;
    }

    closeModalBox () {
        this.isShowModal = false;
        this.columns.map(e => e.print = false);
    }

    handleFieldPrintSelect(event) {
        let id = event.currentTarget.dataset.id;
        this.columns.find(e => e.fieldName === id).print = event.target.checked;
    }


    selectAll(event) {
        event.currentTarget.checked ? this.selectAllCheckboxes(): this.unSelectAllCheckboxes();
    }

    unSelectAllCheckboxes() {
        this.template.querySelectorAll("lightning-input").forEach(checkbox => checkbox.checked = false);
        this.columns.map(e => e.print = false);
    }

    selectAllCheckboxes() {
        this.template.querySelectorAll("lightning-input").forEach(checkbox => checkbox.checked = true);
        this.columns.map(e => e.print = true);

    }


    printData () {

        this.availableFields = this.columns.filter(e => e.print);        
        let doc = printDocument(this.availableFields,this.accounts);

        console.log(doc);

        let element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        downloadElement.download = 'Report - ' + (new Date).toDateString() + '.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }
}
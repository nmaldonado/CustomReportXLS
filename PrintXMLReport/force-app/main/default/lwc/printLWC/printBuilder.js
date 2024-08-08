export function printDocument(availableFields,accounts) {
    let doc = '<table>';

        doc += '<style>';
        doc += '.table-header {'
        doc += '    font-size: medium;';
        doc += '}';
        doc += '.item {';
        doc += '    border-collapse: collapse;';
        doc += '    border: 1px solid red;'
        doc += '    background-color: #CCC;';
        doc += '}';
        doc += '</style>';

        doc += '<tr style="height:115px;">';
        doc+= '<td style="text-align: left;" colspan="6"><img border="0" alt="Capstone Library" src="https://static.vecteezy.com/system/resources/thumbnails/020/402/234/small/library-book-reading-abstract-icon-or-emblem-vector.jpg"/></td>';
        doc += '</tr>';

        doc += '<tr><td>&nbsp;</td></tr>';

        doc += '<tr class="table-header">';
        availableFields.forEach( e => {
            doc += '<th>'+ e.fieldName +'</th>'
        });
        doc += '</tr>';

        accounts.forEach(account => {
            doc += '<tr class="item">';

            if( availableFields.find(e => e.fieldName == 'Name')?.print ) {
                doc += '<td>' + (account.Name ? account.Name : '' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'BillingCountry')?.print ) {
                doc += '<td>' + (account.BillingCountry ? account.BillingCountry : ' ' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'BillingCity')?.print ) {
                doc += '<td>' + (account.BillingCity ? account.BillingCity : ' ' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'Phone')?.print ) {
                doc += '<td>' + (account.Phone ? account.Phone : ' ' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'AnnualRevenue')?.print ) {
                doc += '<td>' + (account.AnnualRevenue ? account.AnnualRevenue : ' ' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'NumberOfEmployees')?.print ) {
                doc += '<td>' + (account.NumberOfEmployees ? account.NumberOfEmployees : ' ' ) + '</td>';
            }
            if( availableFields.find(e => e.fieldName == 'Type')?.print ) {
                doc += '<td>' + (account.Type ? account.Type : ' ' ) + '</td>';
            }
        });

        
        doc += '</tr>';

        doc += '</table>';

        return doc;
}
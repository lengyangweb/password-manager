const table = document.querySelector('#vault-table');
const thead = document.querySelector('#vault-t-head');
const tbody = document.querySelector('#vault-t-body');
const tfoot = document.querySelector('#vault-t-foot');

/**
 * Set vault table header
 * @param {String[]} headers 
 */
function setTHeader(headers) {
    // create table row
    const tr = document.createElement('tr');

    headers.forEach((header) => {
        // create table header tag
        const th = document.createElement('th');
        // add id to tag
        th.id = header;
        th.className = 'border-2 border-yellow-600 py-1 text-xs';
        // append table header text
        th.innerHTML = header;
        // add table header to table row
        tr.appendChild(th);
    })

    // add table row to table header
    thead.appendChild(tr);
}

function setTBody(headers, data) {
    data.forEach(vault => {
        // create table row
        const tr = document.createElement('tr');
        // add class name to table row
        tr.className = 'hover:bg-yellow-600';
        headers.forEach(header => {
            // create table data
            const td = document.createElement('td');
            // add td text
            td.innerHTML = vault[header];
            // add class to data grid
            td.className = `border-2 border-yellow-600 py-1 text-sm`;
            // append table data to table row
            tr.appendChild(td);
        });
        // add table row to tbody
        tbody.appendChild(tr);
    })
    console.log(tbody);
}

/**
 * Show vault table
 * @param {Array} data 
 */
function showVaultTable(data) {
    console.log(data);
    const headers = ['id', 'name', 'username', 'email'];
    setTHeader(headers);
    setTBody(headers, data);
}

export {
    showVaultTable
}
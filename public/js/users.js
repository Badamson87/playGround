let tableData = '';

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('/api/v1/users')
        .then(response => response.json())
        .then(data => createUsersTables(data));
});

function createUsersTables(users){
    users.forEach((user) => {
        tableData += '<tr data-id="' + user.id + '"><td>' + user.name + '</td><td><button onclick="deleteUser(this,' + user.id + ')">Delete</button></td></tr>';
    })
    document.getElementById('userString').innerHTML = tableData
}

function deleteUser(e, id){
    console.log(e)
    return fetch('/api/v1/users/' + id, {
        method: 'DELETE',
    }).then(response => document.querySelector('tr[data-id="'+id+'"]').remove());
}
// permission
const tablePermission = document.querySelector('[table-permissions]');
if (tablePermission) {
  const btnSubmitPermission = document.querySelector('[button-submit-permissions]');
  btnSubmitPermission.addEventListener('click', () => {
    const permissions = [];
    const rows = tablePermission.querySelectorAll('[data-name]');

    rows.forEach(row => {
      const name = row.getAttribute('data-name')
      const inputs = row.querySelectorAll('input');

      if (name == 'id') {
        inputs.forEach(input => {
          permissions.push({
            id: input.value,
            permissions: []
          })
        })
      }
      else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name)
          }
        })
      }
    })
    if (permissions.length > 0) {
      const formChangePermission = document.querySelector('[form-change-permissions]');
      let inputRoles = formChangePermission.querySelector('input');
      inputRoles.value = JSON.stringify(permissions);
      formChangePermission.submit();
    }

  })
}

// end permission


// Data default Table Permissions
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");

  records.forEach((record, index) => {
    const permissions = record.permissions;
    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
      const input = row.querySelectorAll(`input`)[index];
      input.checked = true;
    });
  });
}
// End Data default Table Permissions
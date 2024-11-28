

// form-change-status
const btnChangeStatus = document.querySelectorAll('[button-change-status]');
if (btnChangeStatus.length > 0) {
  btnChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const formChangeStatus = document.querySelector('[form-change-status]');
      if (formChangeStatus) {
        const id = button.getAttribute('data-id');
        const status = button.getAttribute('data-status');
        formChangeStatus.action += `/${status}/${id}?_method=patch`;
        formChangeStatus.submit();
      }
    })
  })
}

// end form-change-status

// checkbox-multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector('input[name="checkAll"]');
  const inputCheckItems = checkboxMulti.querySelectorAll('input[name="checkboxItem"]');
  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked) {
      inputCheckItems.forEach(input => {
        input.checked = true;
      })
    }
    else {
      inputCheckItems.forEach(input => {
        input.checked = false;
      })
    }
  })
  inputCheckItems.forEach(input => {
    input.addEventListener('click', () => {
      const countInputChecked = checkboxMulti.querySelectorAll('input[name="checkboxItem"]:checked').length;
      if (countInputChecked == inputCheckItems.length) {
        inputCheckAll.checked = true;
      }
      else {
        inputCheckAll.checked = false;
      }
    })
  })
}


// end checkbox-multi

// button-click-action
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputIds = formChangeMulti.querySelector('input[name="ids"]');
    const inputCheckeditems = checkboxMulti.querySelectorAll('input[name="checkboxItem"]:checked');
    const actionValue = e.target.elements.action.value;
    if (actionValue == 'delete' && !confirm('Ban co chac muon xoa khong?')) {
      return;
    }
    else if (actionValue == '') {
      alert('Chon hanh dong!');
      return;
    }
    if (inputCheckeditems.length > 0) {
      const ids = [];
      inputCheckeditems.forEach(input => {
        const id = input.getAttribute('data-id');
        if (actionValue == 'position') {
          const position = input.closest('tr').querySelector('input[name="position"]').value;
          ids.push(`${id}-${position}`);
        }
        else {
          ids.push(input.getAttribute('data-id'));
        }
      })
      inputIds.value = ids.join(', ');

      if (actionValue == '') {
        alert("Vui lòng chọn hành động");
        return;
      }
      formChangeMulti.submit();
    }
    else {
      alert('Chon it nhat mot ban ghi!');
      return;
    }

  })
}

// end button-click-action
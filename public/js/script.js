const btnGoBack = document.querySelectorAll('[button-go-back]');
if (btnGoBack.length > 0) {
  btnGoBack.forEach(button => {
    button.addEventListener('click', () => {
      history.back();
    })
  })
}
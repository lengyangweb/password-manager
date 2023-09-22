/**
 * Show dialog message
 * @param {String} message 
 */
function showMessage(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        position: "top", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "green",
          color: 'white',
          display: 'flex',
          justifyContent: 'center'
        }
    });
}

/**
 * Show error dialog message
 * @param {String} message 
 */
function showErrorMessage(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        position: "top", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
          color: 'white',
          display: 'flex',
          justifyContent: 'center'
        }
    });
}

export {
    showMessage,
    showErrorMessage,
}
//add event listeners for button click and enter key
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', submitInput)
document.addEventListener('keypress', (e)=>{
  if (e.key === 'Enter'){
    submitInput();
  }
})

//Handles submitting the input box by generating the POST request and body
function submitInput(){
  const inputBox = document.getElementById('message');
  let inputText = inputBox.value;
  inputBox.value = '';
  const reqBody = JSON.stringify({string_to_cut: inputText});
  
  fetch('http://localhost:3000/test', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: reqBody,
    })
    .then(data => data.json())
    .then(data => displayOnDOM(data))
    .catch(err => displayOnDOM({return_string: 'An error occurred.'}))
}

//Renders a div element to the DOM when a parsed string is returned from the server.
function displayOnDOM(data){
  str = data.return_string;
  const messageDisplay = document.getElementById('message-display');
  const message = document.createElement('div')
  //preserves the whitespace, so 'cool         beans' will
  //display 'o   es' with preserved whitespace instead of 'o es'
  message.style.whiteSpace = 'pre';
  message.innerText = str;
  messageDisplay.prepend(message)
}
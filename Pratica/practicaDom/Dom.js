
let newParagraph = document.createElement('p')
newParagraph.textContent = 'This is new paragraph'  

document.body.appendChild(newParagraph);
document.insertBefore(newParagraph)
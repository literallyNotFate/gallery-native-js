const tags = document.getElementById('tags');
const input = document.getElementById('tags-input')
const button = document.getElementsByClassName('btn-default')[0]

button.addEventListener('click', (e) => {
    e.preventDefault() 
    
    const tag = document.createElement('li') 
    const tagContent = input.value.trim() 
      
    if (tagContent !== '') { 
        tag.innerText = tagContent
        tag.innerHTML += '<button class="delete-btn">X</button>'
        tags.appendChild(tag) 

        input.value = ''
    }
})


tags.addEventListener('click', (e) => { 
    if (e.target.classList.contains('delete-btn')) { 
        e.target.parentNode.remove()
    } 
})
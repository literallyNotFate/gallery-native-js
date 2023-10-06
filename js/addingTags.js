const tags = document.getElementById('tags');
const input = document.getElementById('tags-input')
const button = document.getElementsByClassName('btn-default')[0]

button.addEventListener('click', (e) => {
    e.preventDefault() 

    const array = Array.from(tags.getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
    
    const tag = document.createElement('li') 
    const tagContent = input.value.trim() 

    if (tagContent !== '') { 
        if(array.includes(tagContent)) {
            return
        }

        tag.innerText = tagContent
        tag.innerHTML += '<button class="delete-btn">X</button>'
        tags.appendChild(tag) 

        input.value = ''

        console.log(array)
    }
})


tags.addEventListener('click', (e) => { 
    if (e.target.classList.contains('delete-btn')) { 
        e.target.parentNode.remove()
    } 
})
// Adding tags
const tags = document.getElementById('tags');
const tagInput = document.getElementById('tags-input')
const tagAddButton = document.getElementsByClassName('btn-default')[0]

tagAddButton.addEventListener('click', (e) => {
    e.preventDefault() 
    let array = Array.from(tags.getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
    
    const tag = document.createElement('li') 
    const tagContent = tagInput.value.trim() 

    if (tagContent !== '') { 
        if(array.includes(tagContent)) {
            return
        }

        tag.innerText = tagContent
        tag.innerHTML += '<button class="delete-btn">X</button>'
        tags.appendChild(tag) 

        tagInput.value = ''
        
        array = Array.from(tags.getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
        submit.disabled = validate(imgName.value, array)
    }
})


tags.addEventListener('click', (e) => { 
    if (e.target.classList.contains('delete-btn')) { 
        e.target.parentNode.remove()

        const tagsArray = Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
        submit.disabled = validate(imgName.value, tagsArray)
    } 
})



// Validation
const submit = document.getElementById('submit-form')
const imgName = document.getElementById('name')
submit.disabled = true

function validate(name, tags) {
    const img = name.trim()
    if(img.length > 0 && tags.length > 0) {
        return false;
    }

    return true;
}

const inputs = document.querySelectorAll('input:not([type="submit"])');

inputs.forEach((item) => {
    item.addEventListener('keyup', () => {
        const tagsArray = Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
        submit.disabled = validate(imgName.value, tagsArray)
    })
})
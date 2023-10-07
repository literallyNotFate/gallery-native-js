// ---------------------------------------------------
// Uploading
// ---------------------------------------------------

var image;

var imgInput = document.getElementById('img-upload')

imgInput.addEventListener('change', (e) => {
    e.preventDefault()
    image = imgInput.files[0]

    const tagsArray = Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))

    let prev = document.createElement('p')
    prev.className = 'img-preview'
    prev.setAttribute('name', 'preview');

    document.getElementById("img-data").appendChild(prev)
    const preview = document.getElementsByClassName("img-preview")[0]

    preview.innerText = `Accepted: ${image.name}`
    preview.innerHTML += `<input type='button' class='remove-img' value='Remove'/>`

    if(document.getElementById("img-data").children.namedItem("preview")) {
        document.getElementsByClassName("remove-img")[0].addEventListener('click', () => {
            document.getElementById("img-data").removeChild(preview)
            imgInput.value = null

            submit.disabled = validate(imgName.value, tagsArray, document.getElementById("img-data").children.namedItem("preview"))
        })
    }

    submit.disabled = validate(imgName.value, tagsArray, document.getElementById("img-data").children.namedItem("preview"))
})



// ---------------------------------------------------
// Adding tags
// ---------------------------------------------------

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
        submit.disabled = validate(imgName.value, array, document.getElementById("img-data").children.namedItem("preview"))
    }
})


tags.addEventListener('click', (e) => { 
    if (e.target.classList.contains('delete-btn')) { 
        e.target.parentNode.remove()

        const tagsArray = Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
        submit.disabled = validate(imgName.value, tagsArray, document.getElementById("img-data").children.namedItem("preview"))
    } 
})



// ---------------------------------------------------
// Validation
// ---------------------------------------------------

const submit = document.getElementById('submit-form')
const imgName = document.getElementById('name')

function validate(name, tags, uploaded) {
    const img = name.trim()
    if(img.length > 0 && tags.length > 0 && uploaded) {
        return false;
    }

    return true;
}

const inputs = document.querySelectorAll('input:not([type="submit"]):not([type="file"])');

inputs.forEach((item) => {
    item.addEventListener('keyup', () => {
        const tagsArray = Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1))
        submit.disabled = validate(imgName.value, tagsArray, document.getElementById("img-data").children.namedItem("preview"))
    })
})



// ---------------------------------------------------
// Submitting
// ---------------------------------------------------

const form = document.getElementById("gallery-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const reader = new FileReader();
    if (image) {
        reader.readAsDataURL(image)
    }

    reader.addEventListener('load', () => {
        const result = {
            name: document.getElementById('name').value,
            tags: Array.from(document.getElementById('tags').getElementsByTagName("li")).map((item) => item.innerText.slice(0, -1)),
            image: reader.result
        }

        var gallery = JSON.parse(localStorage.getItem("data") || "[]");
        gallery.push(result);
        localStorage.setItem("data", JSON.stringify(gallery));

        formResetting()
    });
})


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function formResetting() {
    form.reset()
    removeAllChildNodes(document.getElementById("tags"))

    const preview = document.getElementsByClassName("img-preview")[0]
    document.getElementById("img-data").removeChild(preview)
}
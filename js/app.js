// Button onclick function 
let result = () => {
    let inputText = document.getElementById('input-text');
    let inputValue = inputText.value;
    let url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => booksResult(data.docs));
}
// search result function and show result html code here 
let booksResult = books => {
    // show search quentity 
    let quentity = document.getElementById('show-quentity');
    let p = document.createElement('p');
    p.classList.add('py-2')
    quentity.textContent = '';
    p.innerHTML = `
        <span class="font-bold">Showing Results:  ${books.length}</span>
    `;
    quentity.appendChild(p);

    if (books.length === 0) {
        let errorMsg = document.getElementById('error-msg');
        let p = document.createElement('p');
        // clear previous content 
        errorMsg.textContent = '';
        let mainDiv = document.getElementById('result-area');
        mainDiv.textContent = '';
        // error message code here 
        let inputText = document.getElementById('input-text');
        p.innerHTML = `
            <p>Your search - <span class="text-red-500 font-bold"> ${inputText.value}</span> - did not match any of books iteam.</br>
        <span class="text-green-600 font-bold"> Suggestions:</span></br> 
           Make sure that all words are spelled correctly.</br> </p>
           <ol>
                <li>1. Try different keywords.</li>
                <li>2. Try more general keywords. </li>
                <li>3. Try fewer keywords. </li>
            </ol>
        `;
        inputText.value = '';
        errorMsg.appendChild(p);
    } else {
        // clear previous content 
        let inputText = document.getElementById('input-text');
        inputText.value = '';
        let errorMsg = document.getElementById('error-msg');
        errorMsg.textContent = '';

        // show book results
        let mainDiv = document.getElementById('result-area');
        mainDiv.textContent = '';
        // for each function start here 
        books.forEach(i => {
            let div = document.createElement('div');
            div.classList.add('bg-gray-100', 'text-center', 'rounded-md', 'hover:shadow-2xl');
            div.innerHTML = `
            <div class ="p-2">
                <img class="mx-auto rounded-md" src="${coverPage(i.cover_i)}" alt="" width="180" height="274">
                <h3 class="text-green-600 font-bold py-2 text-xl">${i.title} </h3>
                <h5 class="text-blue-400 text-sm">Author: ${author(i.author_name)}  </h5>
                <h5 class="text-green-500 text-sm py-2">Publisher: ${author(i.publisher)}  </h5>
                <h5 class="text-gray-500 text-sm"> Publish Date: ${author(i.publish_date)} </h5>
            </div>  
            `;
            mainDiv.appendChild(div);
        })
    }
}
// author name, publisher name  and publish date validation 
let author = authorName => {
    if (authorName === undefined) {
        return "N/A";
    } else {
        return authorName[0];
    }
}
// cover image functiona and validation 
let coverPage = coverId => {
    let coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    if (coverId === undefined || coverId === Number) {
        return "images/image.png";
    } else {
        return coverUrl;
    }
}

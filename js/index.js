let BASE_URL =  'https://api.github.com/search/users?q=octocat'




    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');

        const form = document.querySelector('#github-form') //submit button when using form
        form.addEventListener('submit', (event) => { //call the button to submit form
            event.preventDefault()
            formSubmit()
        });
    });

       
    function formSubmit() {
        let input = document.getElementById('search')
        const ul = document.getElementById('user-list')
        ul.innerHTML = ""; //this errases the results in the ul after a new result is searched

        fetch(`https://api.github.com/search/users?q=${input.value}`)
        .then(response => response.json())
        .then(data =>  {
            data.items.forEach(user => searchResult(user)) 
        })

    }

    function searchResult(user) {
        //select where it has to go
        const ul = document.getElementById('user-list') //creates a  variable for the ul
        //create li
        const li = document.createElement('li') //creates a new element for the li
        //include showing their username, avatar and a link to their profile
        const img = document.createElement('img') //creates a new element for the image
        const fetchRepoButton = document.createElement('button') // creates a new element for the button
        img.src = user.avatar_url; // this adds the user avatar for the image
        ul.appendChild(li) //this appends the li to the ul
        li.appendChild(img) //this appends the image to the li
        const p = document.createElement('p') //this creates a new variable for the p tag with will hold the user name
        li.appendChild(p) //this appends the p tag to the li
        p.innerText = `Username: ${user.login}` // this makes the p take the users name using the innerText
        fetchRepoButton.innerText = 'Fetch User Repo' //this creates the text for the new button
        li.appendChild(fetchRepoButton) // this appends the button to the li
        fetchRepoButton.addEventListener('click', (e) => fetchRepos(e, user.login)) // this creates an event listener for the button to call a new function

    }

    function fetchRepos(e, username) { //this is the new funtion called from the repo button to fetch the repo information
        const ul = document.getElementById('repos-list')
        ul.innerHTML = "";
        fetch(`https://api.github.com/users/${username}/repos`) //here we are fetching the repos using interpelation passing through the username argument
        .then(response => response.json())
        .then(data =>  {
            data.forEach(repoList => usernameRepos(repoList)) 
        })
    }

    function usernameRepos(repoList) {
        const ul = document.getElementById('repos-list')
        const li = document.createElement('li')
        const p = document.createElement('p')
        ul.appendChild(li)
        li.appendChild(p)
        p.innerText = repoList.html_url
    }

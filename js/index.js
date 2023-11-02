document.addEventListener('DOMContentLoaded', () => {

    const ul = document.querySelector('ul')
    const queryString = 'q='
    let form = document.querySelector('#github-form')
    form.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        ul.innerHTML = ''
        e.preventDefault()
        let searchValue = {
            name: e.target.search.value
        }
        form.reset()
        findUser(searchValue)
        // console.log(searchValue)
    }

    //GET
    function findUser(userLogin) {
        fetch(`https://api.github.com/search/users?${queryString}${userLogin.name}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
            }
        })
            .then(res => res.json())
            .then(userData => userData.items.forEach(user => renderUsers(user)))
            .catch(error => console.error(error))
        //     debugger
        // console.log(userLogin.login)
    }

    //SHOW USERS IN USER LIST
    function renderUsers(user) {
        let ul = document.querySelector('#user-list')
        let userCard = document.createElement('li')
        let div = document.createElement('div')
        div.className = "clickable"
        let h2 = document.createElement('h2')
        h2.textContent = `Login: ${user.login}`
        let button = document.createElement('button')
        button.textContent="View Repos"
        //new line below
        button.setAttribute('data-username', user.login)
        button.addEventListener('click', () =>{
            //2 new variables set here
            const username = button.getAttribute('data-username')
            const reposList = document.querySelector('#repos-list')
            fetch(`https://api.github.com/users/${user.login}/repos`)
            //updating the order of the function
                .then(res => res.json())
                .then(repos => {
                    reposList.innerHTML = ''
                    repos.forEach(repo => {
                        const repoItem = document.createElement('li')
                        repoItem.textContent = repo.name;
                        reposList.appendChild(repoItem)
                    })
                })
                .catch(error => console.log(error))
            
                // .then(url => url.filter((e) => {
                //     let repos = document.createElement('li')
                //     if(reposList !== null){
                //         repos.textContent = e.name
                //     } else {
                //         repos.textContent = e.name
                //         reposList.append(repos)
                //     }
                    
                //     }))
        })
        let p = document.createElement('p')
        p.textContent = `${user.html_url}`
        let img = document.createElement('img')
        img.src = user.avatar_url

        ul.append(div,h2,button,p,img)

        // userCard.innerHTML = `
        //     <div class="clickable">
        //     <h2>Login: "${user.login}"</h2>
        //     <button class="repos">View Repos</button>
        //     <p>${user.html_url}</p>
        //     <img src="${user.avatar_url}">
            
        //     </div>
        //     `
        // ul.appendChild(userCard) 
    }
})


//end of DOMContenLoaded     
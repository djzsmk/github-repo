//global variables//


const overview = document.querySelector(".overview")
const username = "djzsmk"
const repoList = document.querySelector(".repo-list")
const repoInfo = document.querySelector(".repo")
const repoStats = document.querySelector(".repo-data")

//api json data//

const getData = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}`
    )
    const data = await res.json()
    //console.log(data)
    userData(data)
}
getData()


const userData = function (data) {
    const div = document.createElement("div")
    div.classList.add("user-info")
    div.innerHTML =  `
        <figure>
            <img alt="user avatar" src= ${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</P>
            <p><strong>Location:</strong> ${data.location}</P>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`
    overview.append(div)
    repoData()
}

//repo data//
const repoData = async function () {
    const fetchRepos = await fetch(
       `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
    const repoThings = await fetchRepos.json();
    //console.log(repoThings)
    repoDisplay(repoThings)
    
}

const repoDisplay = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo")
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem)
    }
}

repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText
        getRepoInfo(repoName)
    }
})

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    )
    const repoInfo = await fetchInfo.json()
    //console.log(repoInfo)
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json()
    console.log(languageData)

    const languages = []
    for( const language in languageData) {
        languages.push(language)
    }
    specRepoInfo(repoInfo, languages)
}

const specRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div")
    repoData.classList.remove("hide")
    repoInfo.classList.add("hide")
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</P>
        <P>Default Branch: ${repoInfo.default_branch}</P>
        <P>Languages: ${languages.join(", ")}</P>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
        `;
        repoData.append(div);
} 
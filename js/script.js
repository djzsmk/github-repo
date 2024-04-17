//global variables//

//profile info//
const overview = document.querySelector(".overview")
const username = "djzsmk"

//api json data//

const getData = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}`
    )
    const data = await res.json()
    console.log(data)
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
}
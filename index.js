// chrome://extensions/

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//localStorage.setItem("myLeads", "www.epiclead.com")
//console.log( localStoage.getItem("myLeads") )
//localStorage.clear()

// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()

if (leadsFromLocalStorage) {
    leads = leadsFromLocalStorage
    render(leads)
}


tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)

    })

})


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        // listItems += "<li><a target='_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        // template strings below
        listItems += `
            <li>
                <a target = '_blank' href = '${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>
        `

    // A different method! //
    // create element
    // set text content
    // append to ul
    // const li = document.createElement("li") //create element
    // li.textContent = myLeads[i] //set text content
    // ulEl.append(li) //append to ul
    }
    ulEl.innerHTML = listItems
}

deletebtn.addEventListener('dblclick', function() {
    localStorage.clear()   // clear the localStorage,
    myLeads = []        //clear myLeads
    render(myLeads)   //clear the DOM
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    //console.log(myLeads)
    inputEl.value = "" //looked up online
    // Save the myLeads array to localStorage 
    // PS: remember JSON.stringify()
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)

    // To verify that it works:
   // console.log ( localStorage.getItem("myLeads") )
});








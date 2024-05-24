//document is an object which represents the webpage

let h2Elem=document.querySelector("h2"); //search and return an element

// //get the text elem of h2
// console.log(h2Elem.innerText);

// //update the text
// h2Elem.innerText="new val";

let ulElem=document.querySelector("ul");

//create li -> add content -> append to ul
let liElem=document.createElement("li");
liElem.innerText="I am an li element ";
ulElem.appendChild(liElem);

for(let i=1;i<=5;i++)
    {
        let liElem=document.createElement("li");
        liElem.innerText="I am an li element " + i;
        ulElem.appendChild(liElem);
    }

//delete an element
h2Elem.remove();    


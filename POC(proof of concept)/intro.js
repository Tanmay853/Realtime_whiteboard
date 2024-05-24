
/*Event listeners*/

let ulElem=document.querySelector("ul");

let liElem=document.createElement("li");
liElem.innerText="I am an li element ";
ulElem.appendChild(liElem);


// event listener
liElem.addEventListener("click",liRemover);
function liRemover()
{
    console.log("Li was clicked");
    liElem.remove();
}

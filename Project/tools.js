//select the element
//add the event listener
//apply the changes
//document refers to the HTML page
let pencilElement=document.querySelector("#pencil");
let eraserElement=document.querySelector("#eraser");
let stickyElement=document.querySelector("#sticky");
let uploadElement=document.querySelector("#upload");
let downloadElement=document.querySelector("#download");
let undoElement=document.querySelector("#undo");
let redoElement=document.querySelector("#redo");

let canvas=document.querySelector("#board");
//give it width and height equal to that of the window
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let tool=canvas.getContext("2d");//draw on 2-D canvas
let toolBar=document.querySelector(".toolbar");
// let Head=document.querySelector("#header");

let undostack=[];
let redostack=[];

//-----------------BASIC SYNTAX-----------------
// tool.beginPath();//start the drawing
// tool.moveTo(0,0);//from where to start the drawing = start point
// tool.lineTo(300,150);//move the pencil to a point = end point
// tool.moveTo(400,200);//from where to start the drawing = start point
// tool.lineTo(100,100);//move the pencil to a point = end point
// tool.stroke();//draw the line

// tool.beginPath();
// tool.strokeStyle="red";
// tool.lineWidth=10;
// tool.moveTo(200,200);
// tool.lineTo(1024,1024);
// tool.stroke();

//console.log("tool",tool); //all properties of canvas ->Inspect-Console
//----------------------------------------------------------

pencilElement.addEventListener("click",function tellPencil()
{
    console.log("Pencil is clicked");
    
    //pencil implemntation--------------------------------------------
    let isDrawing=false;
    tool.strokeStyle="blue";
    tool.lineWidth=10;
    //to get the postion of press or release, function(e) and console.log(,e) are used
    canvas.addEventListener("mousedown",function(e)
    {
        // console.log("mousedown",e);
        // console.log("x",e.clientX);
        // console.log("y",e.clientY);
        let sidx=e.clientX;
        let sidy=e.clientY;
        let ht=getYdelta();
        isDrawing=true;
        tool.beginPath();
        tool.moveTo(sidx,sidy-ht);

        let pointDesc={x:sidx,y:sidy-ht,desc:"md"}
        undostack.push(pointDesc);
    })

    canvas.addEventListener("mousemove",function(e)
    {
        if(isDrawing==false){return;}
        let eidx=e.clientX;
        let eidy=e.clientY; 
        let ht=getYdelta();   
        tool.lineTo(eidx,eidy-ht);
        tool.stroke();
        let pointDesc={x:eidx,y:eidy-ht,desc:"mm"}
        undostack.push(pointDesc);
    }
    )
    canvas.addEventListener("mouseup",function(e)
    {
        // console.log("mouseup",e);
        // console.log("x",e.clientX);
        // console.log("y",e.clientY);  
        isDrawing=false;

    })

    function getYdelta()
    {
        console.log(toolBar.getBoundingClientRect());
        let  a=toolBar.getBoundingClientRect().height;
        //let b=Head.getBoundingClientRect().height;
        let heightOfTB=a;
        return heightOfTB;
    }
    //------------------------------------------------------------------
})
eraserElement.addEventListener("click",function tellEraser()
{
    console.log("Eraser is clicked");
    
    //eraser implemntation--------------------------------------------
    let isDrawing=false;
    tool.strokeStyle="white";
    tool.lineWidth=10;
    //to get the postion of press or release, function(e) and console.log(,e) are used
    canvas.addEventListener("mousedown",function(e)
    {
        // console.log("mousedown",e);
        // console.log("x",e.clientX);
        // console.log("y",e.clientY);
        let sidx=e.clientX;
        let sidy=e.clientY;
        let ht=getYdelta();
        isDrawing=true;
        tool.beginPath();
        tool.moveTo(sidx,sidy-ht);
    })

    canvas.addEventListener("mousemove",function(e)
    {
        if(isDrawing==false){return;}
        let eidx=e.clientX;
        let eidy=e.clientY; 
        let ht=getYdelta();   
        tool.lineTo(eidx,eidy-ht);
        tool.stroke();}
    )
    canvas.addEventListener("mouseup",function(e)
    {
        // console.log("mouseup",e);
        // console.log("x",e.clientX);
        // console.log("y",e.clientY);  
        isDrawing=false;

    })

    function getYdelta()
    {
        console.log(toolBar.getBoundingClientRect());
        let  a=toolBar.getBoundingClientRect().height;
        //let b=Head.getBoundingClientRect().height;
        let heightOfTB=a;
        return heightOfTB;
    }
    //------------------------------------------------------------------

})
stickyElement.addEventListener("click",function tellSticky()
{
    console.log("Sticky is clicked");
    createSticky();
})
function createSticky()
{
    //create elements
    let stickyDiv=document.createElement("div");
    let navDiv=document.createElement("div");
    let minDiv=document.createElement("div");
    let closeDiv=document.createElement("div");
    let textArea=document.createElement("textarea");
    //classs styling
    stickyDiv.setAttribute("class","sticky");
    navDiv.setAttribute("class","nav");
    textArea.setAttribute("class","text-area");  
    
    minDiv.innerText="min"; 
    closeDiv.innerText="X";
    
    //HTML str.
    stickyDiv.appendChild(navDiv);
    stickyDiv.appendChild(textArea);
    navDiv.appendChild(minDiv);
    navDiv.appendChild(closeDiv);

    //add to webpage
    document.body.appendChild(stickyDiv);

    //close option 
    closeDiv.addEventListener("click",function closed()
    {
    console.log("close is clicked");
    stickyDiv.remove();
    })

    //min option
    let isMin=false;
    minDiv.addEventListener("click",function()
    {
    console.log("min is clicked");
    if(isMin==false)
    textArea.style.display="none";
    else
    textArea.style.display="block";
    isMin=!isMin;
    })

    let isStickyDown=false;
    let sidx=0;
    let sidy=0;
    //movement
    //navbar -> mouse down,mouse move, mouse up
    navDiv.addEventListener("mousedown",function(e)
    {
        sidx=e.clientX;
        sidy=e.clientY;
        isStickyDown=true;
    })

    navDiv.addEventListener("mousemove",function(e)
    {
        if(isStickyDown==true)
        {
            let eidx=e.clientX;
            let eidy=e.clientY;
            
            let dx=eidx-sidx;
            let dy=eidy-sidy;

            let {top,left}=stickyDiv.getBoundingClientRect()
            stickyDiv.style.top=top+dy+"px";
            stickyDiv.style.left=left+dx+"px";
            sidx=eidx;
            sidy=eidy;
        }
    }
    )
    navDiv.addEventListener("mouseup",function(e)
    {  
        isStickyDown=false;
    }
    )
}

let inputTag=document.querySelector(".input-tag")
uploadElement.addEventListener("click",function tellUpload()
{
    console.log("Upload is clicked");
    //input  tag to accept file (<input type>="file") - hide the option -  done in style.css

    //click image icon -> input tag must be clicked - done in HTML

    //input tag click will take the input
    inputTag.click();

    //read file from input tag
    inputTag.addEventListener("change",function()
    {
        console.log("files",inputTag.files[0]);
        let data=inputTag.files[0];
        //add file to UI
        let img=document.createElement("img");
        img.src=URL.createObjectURL(data);
        img.height=100;
        img.setAttribute("class","upload-img");

        //add image to body
        //create elements
        let stickyDiv=document.createElement("div");
        let navDiv=document.createElement("div");
        let minDiv=document.createElement("div");
        let closeDiv=document.createElement("div");
        //classs styling
        stickyDiv.setAttribute("class","sticky");
        navDiv.setAttribute("class","nav");
        
        minDiv.innerText="min"; 
        closeDiv.innerText="X";
        
        //HTML str.
        stickyDiv.appendChild(navDiv);
        navDiv.appendChild(minDiv);
        navDiv.appendChild(closeDiv);

        //add to webpage
        document.body.appendChild(stickyDiv);

        //close option 
        closeDiv.addEventListener("click",function closed()
        {
        console.log("close is clicked");
        stickyDiv.remove();
        })

        //min option
        let isMin=false;
        minDiv.addEventListener("click",function()
        {
        console.log("min is clicked");
        if(isMin==false)
        textArea.style.display="none";
        else
        textArea.style.display="block";
        isMin=!isMin;
        })

        let isStickyDown=false;
        let sidx=0;
        let sidy=0;
        //movement
        //navbar -> mouse down,mouse move, mouse up
        navDiv.addEventListener("mousedown",function(e)
        {
            sidx=e.clientX;
            sidy=e.clientY;
            isStickyDown=true;
        })

        navDiv.addEventListener("mousemove",function(e)
        {
            if(isStickyDown==true)
            {
                let eidx=e.clientX;
                let eidy=e.clientY;
                
                let dx=eidx-sidx;
                let dy=eidy-sidy;

                let {top,left}=stickyDiv.getBoundingClientRect()
                stickyDiv.style.top=top+dy+"px";
                stickyDiv.style.left=left+dx+"px";
                sidx=eidx;
                sidy=eidy;
            }
        }
        )
        navDiv.addEventListener("mouseup",function(e)
        {  
            isStickyDown=false;
        }
        )

        stickyDiv.appendChild(img);
    });
    
    



})
downloadElement.addEventListener("click",function tellDownload()
{
    console.log("Download is clicked");
    //anchor button
    //href=canvas(after conversion to URL)
    //anchor click
    //anchor remove
    //download attribute to ancor

    let a=document.createElement("a");//anchor button
    a.download="file.jpeg";//file name
    let url=canvas.toDataURL("image/jpeg;base64");//board to URL
    a.href=url;
    a.click();//click the anchor
    a.remove();
})
undoElement.addEventListener("click",function tellUndo()
{
    console.log("Undo is clicked");
    //stack usage
    //no undo via canvas functions
    
    //as you draw -> store co-ordinates

    //possibilities: canvas function is not possible, so invent your own logic
    //canvas gives us one function clearRect() which clears the whole screen
    //store points - remove the last point - redraw
    if(undostack.length>0)
        {
            tool.clearRect(0,0,canvas.width,canvas.height);
            redostack.push(undostack.pop());
            for(let i=0;i<undostack.length;i++)
                {
                    let{x,y,desc}=undostack[i];
                    if(desc=="md")
                        {
                            tool.beginPath();
                            tool.moveTo(x,y);
                        }
                    else if(desc=="mm")
                        {
                            tool.lineTo(x,y);
                            tool.stroke();
                        }
                }            
        }

})
redoElement.addEventListener("click",function tellRedo()
{
    console.log("Redo is clicked");
    if(redostack.length>0)
        {
            tool.clearRect(0,0,canvas.width,canvas.height);
            undostack.push(redostack.pop());
            for(let i=0;i<undostack.length;i++)
                {
                    let{x,y,desc}=undostack[i];
                    if(desc=="md")
                        {
                            tool.beginPath();
                            tool.moveTo(x,y);
                        }
                    else if(desc=="mm")
                        {
                            tool.lineTo(x,y);
                            tool.stroke();
                        }
                }   
        }

})




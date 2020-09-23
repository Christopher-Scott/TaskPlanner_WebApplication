function home(){
    var content = `
        <div class="row">
                <div id="column66">
                    <!-- functionality description-->
                    <p>
                        <strong>Easily keep track of your assignments, tasks, and goals!</strong>           

                        This site will provide a simple list based assignment or task planner.
                        Users can enter a text description, an associated due date, 
                        and an appropriate icon for their task.
                    </p>
                    <p>
                        At a later date tasks will be sortable based upon due date or other parameters.  
                        Entries could even be used for notes, similar to 
                        <a href="https://evernote.com">Evernote</a>.
                    
                    </p>                   
                </div>

                <img id="column33" src="pics/paper-planner.jpg" alt="Assignment Planner Book">
            </div>`
        
        var element = document.createElement("div");
        element.innerHTML = content;
        return element;
    }



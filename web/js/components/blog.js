function blog(){
    var content = `
         <!-- Description of database table -->
            <h2>Database Description</h2>
            <p>
                The database table will consist of the following:
            </p>
            <ul>

                <li>A due date specified by the user associated with this entry</li>
                <li>A text description of the assignment/task</li>
                <li>A record of the user(not entered by user) as a foreign key</li>
            </ul>
        <!-- Description of web dev experience -->
            <h2>Web Development Experience</h2>
            <p>
                I have limited web development experience.  I completed a Lynda tutorial on HTML, and feel reasonably comfortable
                with the different tags and structure.  The tutorial did include some basic CSS and Javascript, 
                however the information was restricted to what was necessary for the module.  
                Thus my experience with CSS is less, and will require looking up the syntax
                more frequently.  I know only the basics of Javascript syntax and am confident it will not be terribly difficult
                to pick up based on my experience with other programming languages.
            </p>
            <!-- What was easy, hard, and valuable about this HW -->
            <h2>Home Page</h2>
            <p>
                I found this assignment relatively straight-forward until I started the CSS styling.  
                Constructing the HTML structure went smoothly, and I did not have to look up much to accomplish my goals.
                When creating the styling for the page, I had to look up much more from W3schools to find syntax or the exact property
                I needed.  I also ran into an issue when setting the titleNav to be fixed and styled properly.  When I added background colors
                to my div they were not displaying, the titleNav was not fixed despite the CSS code being correct, and the flex-box was not
                responding properly.  The bug ended up being very simple.  I had a typo in the div ID.  My CSS code was fine, but was not being applied
                because the selector didn't have the typo.  I learned that I don't have efficient debugging behaviors established yet for web development.
                Next time when my styles aren't working, I'll check the selector and ID/Class first.
            </p>
            <h2>JavaScript UI</h2>
            <p>
                This assignment posed new challenges in the form of JavaScript.  Thankfully the sample code provided a good
                reference for the goals of the assignment.  I found it particularly difficult to get the behavior for the
                dropdown menus to be mutually exclusive.  Ultimately, this was a logic problem. While it was not strictly an 
                issue with JS, my inexperience caused me to question my approach.  I was helped by following the JS software
                design principles when I began moving my code to an external file.  The logic flow made more
                sense in that context and highlighted where I had gone wrong.  When it came time to do the routing I had
                a much easier time and found it easy to adhere to the dependency injection principle.  I was then able to
                go back and change my dropdown code to follow a similar scheme.  I also had a difficult challenge with the
                styling of the dropdown menus where the hover area of a link was not what it should be.  By changing the
                clickable size of the link (using block display and padding), I discovered that the links were being covered
                by the other hidden dropdown menus.  To solve this I added a higher z-index value to the open dropdown menu.
            </p>
            <h2>JavaScript SlideShows</h2>
            <p>
                Creating a slideshow as a reusable component gave me a lot more experience in creating page elements purely
                in javaScript.  It is a topic that we touched on with the routing enhancements, but now I understand more
                about the mechanics and how to achieve my goals.  My biggest challenge for this assignment was the public
                method.  I struggled to come up with an idea and then once I decided on a slide number counter I found the
                implementation to be difficult.  At first I tried wrapping all the code necessary for the slide counter in
                the public method, but this solution merely appended the element to the end of the slideshow.  It was ugly.
                I wanted the element to be between the prev and next buttons. As I added functionality to update the slide
                counter I realized I would need to set up the element in the parent function and have the public function
                simply enable the slide counter for the slideshow element.  Incorporating the routing and new page was
                definitely the easiest part of this assignment.  The way we have our routing structured makes it effortless
                to add or change pages.
            <h2>Database</h2>
            <p>
                I had some database experience previous to this course.  I had completed a Lynda.com tutorial covering
                SQL using mySQL as the database management system.  From this course I knew about the various SQL commands,
                primary keys, and using foreign keys.  It has been some time since I did this tutorial, so there is a
                lot from the course that I do not remember and never had occasion to put into practice.
            </p>
            <p>
                This assignment was a good introduction and review of database concepts with SQL.  In my previous database
                experience I was writing commands in raw SQL, and I found the switch to MySQL workbench a welcome change.
                It is more efficient to have the GUI tool for most actions, and then be able to write SQL commands if you require
                anything specific or complicated.  I also really appreciate that MySQL workbench takes care of the transactions
                for the user.  There was no part of this assignment that was particularly difficult.
    
                Click <a target="_blank" href='pics/C_Scott_database.pdf'>here</a> to see my database document.
            </p>
            <h2>Display Data</h2>
            <p>
                I had a more difficult time putting the pieces together for this assignment than any others.  A combination
                of the involved code for the click-sortable table component and some tricky bugs made for a tougher time.
                I also complicated the process by not thoroughly reading the instructions and missing the filter input behavior.
                When I had a completely functional sortable table comoponent I had to change the code to accomodate the filtering.
                There were some issues to solve with this, mostly due to human errors when refactoring the code.  Creating the table
                itself was not terribly difficult.  Following the sample code and using the experience gained in the Lab activity
                certainly made the core table creation functionality easier.
            </p>
            <h2>Tutorial Proposal</h2>
            <p>
                My proof of concept for the tutorial proposal presented some unique challenges because I needed to shift away
                from the w3school's HowTo page in order to achieve the desired result.  I treated this POC as an opportunity not
                just to test the looks and function of the component, but also test the interactions of using certain element types.
                For example, the HowTo Calendar page uses an unordered list to represent the days in the month.  I initially
                constructed my page this way, and then moved to the table format because it will work better
                when constructing the component programamatically.  Thus my POC had a lot of trial and error as I tested
                different aspects.  I also had particular difficulty with the CSS code and achieving consistent styling
                across the unopened, week, and day views.  This should be easier when I make the actual component because
                I will be able to handle styling in JS using the tree model of HTML rather than selecting classes.
            </p>
            <h2>Web API</h2>
            <p>
                Creating the listTasksAPI required adding server side code to connect to the database, query the database,
                creating a list of the queried data objects, and finally delivering the data as a JSON object.  Most of this
                functionality is encapsulated in TaskView.java.  This code handles the SQL statement, query of the database, and
                construction of the list.  The basics of connecting and querying a database using Java were not foreign 
                to me, but this assignment made me much more comfortable with the mechanics of the Connection, Statement, and
                ResultSet objects.  I was also able to learn a lot about design patterns for server side code using
                object oriented programming from the sample code for the assignment.  The hardest part of this lab
                I encountered was a conceptual problem related to error handling.  The question was "How close to the
                user should Error Messages be handled and displayed?".  For example, if the database is unavailable,
                should the client side code generate a user friendly error message or should the API generate the
                message?  Ultimately I decided that the error message should be generated where it can still
                convey a friendly message that the user will see while also having specificity related to the
                problem.  Since the database connection is obtained in the API I added the database unavailable
                error there.
                <p>
                Click <a href="HW5_ErrorGeneration.docx">here</a> to see my document of database errors.
                <br>
                Click <a href="webAPIs/listUsersAPI.jsp" >here</a> for the Web API that accesses users from the db.
                <br>
                Click <a href="webAPIs/listTasksAPI.jsp">here</a> for the Web API that lists tasks.
                </p>
            </p>
            <h2>Log On</h2>
            <p>
                Most of my difficulties with this assignment came when constructing the log on user interface.  
                Creating the APIs was simple after our discussion in class about the request and session
                implicit objects.  But my experience with the log on UI was different.  I think it was my lack
                of experience, but it took a lot of trial and error to get right.  Ultimately, I solved my issues
                by using a CSS grid layout and placing the labels and input fields in different columns.  I also
                ran into an issue with my user that had all nullable fields set to null in the user table.  With my
                original solution when trying to log in as this user the error "User not found" was thrown in
                DbMods.finduser().
                It was necessary to use a different select statement that checked if the password column was null
                instead of matching the password.  This enabled the user to still log in, but also verified correctly
                any user that had a password set.
                
                <ul>                    
                    <li><a target="_blank" href="webAPIs/logonAPI.jsp?email=bob@gmail.com&password=123456">Successful Log on</a></li>        
                    <li><a target="_blank" href="webAPIs/getProfileAPI.jsp">Get profile</a></li>        
                    <li><a target="_blank" href="webAPIs/logoffAPI.jsp">Log Off</a></li>
                    <li><a target="_blank" href="webAPIs/listUsersAPI.jsp">List all users</a></li>
                </ul>
            </p>
    
            <h2>Tutorial</h2>
            <p>
                Creating my Calendar component required building on much that we have learned in this class.
                I looked at how we implemented the drop down headers and clicksort table and applied that knowledge
                to a new component.  I predicted in my proposal that the creation of the component and accessing elements
                in it would be easier than building my proof of concept.  This ended up being true because there were
                a lot of repetitive elements that could easily be created programmitcally.  This really drove home the
                value of creating reuseable components using JavaScript over static website content with HTML.
                Another thing I found valuable about this assignment was encapsulation with private functions
                I attempted to encapsulate much of the code for the component.  This paid off as I found myself needing the same code logic again and again.
            </p>
            <p>    
                I did have to learn more about some of the JS built in objects as part of this assignment.  The JS Date object was
                the most important.  
                Much time was spent figuring out how I could use the date objects almost like a key to match up a data cell in the component
                to the corresponding data.  
            </p>
            <p>
                The hardest part of this assignment was creating the default styling for the component.  Often I found that elements
                I did not want to be selected were being changed, and that the cascading functionality of the style sheets
                was dictating the specific order to style the items.  Particularly, I originally had a div element containing
                the data inside of a td element.  The styling for these child divs clashed with the spotlight, which was also
                a div.  The hover styling also did not work properly because of the child div elements.  I was able to solve 
                my problem by rethinking the structure of the element tree I was using.  By using paragraph elements and spreading
                out the top branches of the component's element tree I was able to achieve my goals.
            </p>
            
            <h2>Update</h2>
            <p>
                This assignment required refactoring some parts of my web app from previous assignments.  Originally I did not have
                a unique 'description' column in my database schema.  To rectify this issue I had to add a new unique column 'uniqueTitleId'
                that would be a concatenation between the task title and the web User ID foreign key.  All of the logic for managing this new
                field is handled server side and thus the refactor had minimal impact on my existing client side code.  
                I also modified my clicksort component (MakeTable.js)
                to handle passed DOM elements as well as Strings.  This refactor let me create the update icon elements and set the properties before inserting
                it into the table as well as incorporating the elements into the sorting and filter functionality.  
                I made these changes before the sample code was updated, but I am glad I made the change because it was simple and
                extended the flexibility of the component.
            </p>
            <p>
                I chose to only enable updates to the tasks that belong to the logged in user.  The validation happened both client side and server side.
                In the update API an error message is returned and the update is canceled if the requesting user does not match the logged on user in the
                session object.  On the client side I refactored the taskList component so that it first uses an ajax call to get the logged on user
                via the getProfileAPI and then the success callback function has a nested ajax call that retrieves the Task data.  Then the clicksort
                is created, only adding update icons for the logged on user, or none at all if there is no user logged on.  The hardest part of this
                was coming up with the idea to use the getProfileAPI.  After that the implementation was simple.
            </p>
            <p>
                Because I did the tutorial homework I added the insert functionality provided in the sample code to my web user list.  Now the register
                link is functional, and there is also an insert icon in the header of the web user list.
            </p>
    
            <h2>Delete</h2>
            <p>
                Most of the delete functionality was simple to implement because it was similar to the update functionality.  Some of the changes
                I made to my application for the update homework, like refactoring the clicksort to handle DOM elements, 
                really helped simplify this assignment as well.  Although the homework requirements did not call for it, I enabled delete functionality 
                only for a logged on user's task records.  I made the deleteTaskAPI with this approach because I had gone that route for the
                update as well.  As a result, there is a deviation from the homework requirements and my implementation&mdash;I had to add the logged on
                user's id as an an additional parameter to the delete API request.  Hopefully this is acceptable.
            </p>
            <p>
                One difficulty I ran into with this assignment was where to put the error messages returned by the API on my page.  While developing
                the client side code I had a div for the error messages at the top of the page but this looked terribly ugly.  I did not like that the
                user might be scrolled down the table and have to scroll to the top to get any response for their delete request.  I had already incorporated
                a modal window to confirm the delete request, so the answer was to use that modal to show the response to the user.  I extended my modal
                framework code with another public method that takes a DOM element as a parameter and displays it as a child of the message area.
                This way I could take the element that was originally passed to the ajax call for the delete request and display it in the modal window.
            </p>
            `
    
    var element = document.createElement("div");
    element.innerHTML =  content;
    return element;
}



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
            `
    
    var element = document.createElement("div");
    element.innerHTML =  content;
    return element;
}



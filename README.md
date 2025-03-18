# https-github.com-COS30045-2025-Classroom-w0-ex0-2-energy-website-POTATOES0707

<h1>GenAI Acknowledgement</h1>

<hr>

<p><b>I have acknowledged the fact that I use GenAI assistance. </b><br>

<fieldset>
    <p>This code below is a JavaScript code from the main.js file which is responsibile for displaying which page the user is currently on. I have never studied JavaScript before hence I had no idea how to complete this task requirement. With the use of GenAI, I was able to understand the logic and able to implement the necessary functionality to display the current page. </p>
    <br>
    <legend><u><i>Java Script Code</i></u></legend>
    <pre>
            function showCurrentPage() {
                const currentPage = window.location.pathname.split('/').pop();
                document.getElementById('currentPage').innerText = `You are currently on: ${currentPage}`;
            }
            window.onload = showCurrentPage;
            //Showing users what page they are on
    </pre>

</fieldset>
<br>
</p>
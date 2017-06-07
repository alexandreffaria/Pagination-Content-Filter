//Pagination & Content Filter


var students = $('.student-item'); // Every student in the page. Used to first page load.
var paginationArea = $('.pagination'); // Used to first page load.

function loadsPage() { //Loads index page
  for(var i = 10; i < students.length; i++){ // This for just hide everyone on the page, but the first 10 students, using the student-iten class
    students[i].style.display = 'none';  // Changes the CSS prop 'display' to none
  }
//  var paginationArea = $('.page-header h2::after');

//  paginationArea.innerHTML = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';
    appendPageLinks(students); //Create the pagination links for all the students

    $(".pagination li:first-child a").addClass("active"); //sets the link 1 class to active

    searchList(); // Loads the searchbox
};

function appendPageLinks(listOfStudents) { /* take a student list as an argument */
  var numberOfPages = Math.ceil(listOfStudents.length/10); // determine how many pages for this student list
  var html = '<ul>'; // create a page link section

  for(var i = 1 ; i< numberOfPages + 1 ; i++){  // “for” every page add a page link to the page link section
    html += '<li><a href="#">' + i + '</a></li>';
  }
  html += '</ul>'; // ends paginationArea string

  paginationArea.html(html); //inserts the pagination to the html.

  $('.pagination a').click(function(e){ //listens to clicks on the pagination area

    $('.active').removeClass('active'); //Removes every link that has the active class
    $(this).addClass('active'); //Adds the active class to the link clicked

    showPage($(this).text(), listOfStudents); //Calls showPage() that print accordingly to the link

  })
};




function showPage(pageNumber, listOfStudents){ //recieves the link clicked and a list of all the students

  var superiorLimit = pageNumber*10; // The math to position the students to be selected
  var inferiorLimit = superiorLimit - 10;

  for(var i = 0; i < students.length; i++){ // This for just hide everyone on the page using th stunde-iten class

    students[i].style.display = 'none';

  }

  for( ; superiorLimit > inferiorLimit; superiorLimit--){ // This for display the students on the passed studentsList

     if(!listOfStudents[superiorLimit]){} // Makes sure the loop skips the complement of 10. Meaning if there is 6 students we wont try to access the other 4 elements that doensnt existe in the array.

     else listOfStudents[superiorLimit].style.display = 'block'; // Display the students

   }
  if (pageNumber === 1){} // if page number = 1 we dont need to show the paginationArea
  else appendPageLinks(listOfStudents); // create the paginationArea

};


function searchList() { //Rearange the students based on user query

  $('button').click(function(){ //listens to html button

    var $studentSearched = $('input').val(); // Search text input
    var studentsFound = []; // array for the students found

    for(var i = 0; i < students.length; i++){ // This for just hide everyone on the page using th stunde-iten class
      students[i].style.display = 'none';
    }


    $('.pagination a').remove(); // Remove pagination, so we can create the new one with the size of the results

      for(var i = 0; i < students.length; i++ ){ // Loop for all the students

        if(students[i].innerText.indexOf($studentSearched) >= 0){ //indexOf returns the position in the array of the $studentSearched checking with every student in the page.
          studentsFound.push(students[i]); // pushes the student found to an array
        }
      }

      if(!studentsFound.length) { //sends a message to the user that no one was found
        alert('No one found :(');
      }
      else if(studentsFound.length > 10){ //checks if we need more pages
        appendPageLinks(studentsFound);
      }
      else{ // case for students found but we dont need more the one page.
        showPage(1,studentsFound);
      }

  });


};

loadsPage(); //Loads index page

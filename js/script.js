/*
   Treehouse Techdegree:
   Project 6 - Data Pagination and Filtering
*/

/* 
    Project Notes: 
    I am going for an 'Exceeds Expectations' grade! :)
    Added a search compnonent.
    Added functionality to the search component.
    Added pagination for the search results.
    Added a "no results found" message printed to the page if no results are found.
*/

/*
   Creating the `showPage` function.
   Which will create and append the elements needed to display a page of nine students.
*/

let itemsPerPage = 9;

function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for ( let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}


/*
   Creating the `addPagination` function
   which will create and append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      let button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }
   
   document.querySelector('.link-list li button').className = 'active';
   
   linkList.addEventListener('click', (e) => {
      if (e.target.type === 'button' ) {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
   
}

showPage(data, 1);
addPagination(data);


/* EXTRA CREDIT:
   This section creates a search bar which accepts input from the user
   then filters the results based on the input.
*/

const searchBar = `
 <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>
`;
document.querySelector('.header').insertAdjacentHTML('beforeend', searchBar);


// Setting variables to select and store searchbar input

const search = document.querySelector('#search');
const submit = document.querySelector('.student-search button');
let match = [];



// This function takes user's input and the array of names as parameters.

function searchMatches (input, names) {
 match = [];
 for ( let i = 0; i < names.length; i++ ) {
    const studentName = names[i].name.first.toLowerCase() + ' ' + names[i].name.last.toLowerCase();
    if (studentName.includes(input.value.toLowerCase()) ) {
       match.push(names[i]);
    }
    }
}

// Filter search results when search button is clicked:

submit.addEventListener('click', () => {
   searchMatches(search, data);
   showPage(match, 1);
   
   const header = document.querySelector('.header h2');
   
   if (match.length >= 1) {
      addPagination(match);
      header.textContent = 'STUDENTS'; 
   } else {
      const linkList = document.querySelector('.link-list');
      linkList.innerHTML = '';
      header.textContent = 'No results found';
   }
});

// Filter search results when search bar is typed into:

search.addEventListener('keyup', () => {
   searchMatches(search, data);
   showPage(match, 1);
   
   const header = document.querySelector('.header h2');
   
   if (match.length >= 1) {
      addPagination(match);
      header.textContent = 'STUDENTS';
   } else {
      const linkList = document.querySelector('.link-list');
      linkList.innerHTML = '';
      header.textContent = 'No results found';
   }
});

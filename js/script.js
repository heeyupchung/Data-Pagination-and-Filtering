/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// creates textbox and button for search
let searchBar =`
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

let h2 = document.querySelector('h2');
h2.insertAdjacentHTML('afterend', searchBar);

let input = document.querySelector('input');
let searchButton = document.querySelector('button');


// searches through data
function search(input, list) {
   
   let partialList = [];
   let text = input.value;
   
   for (let i = 0; i < list.length; i++) {
      if (text.length !== 0 && list[i].name.title.toUpperCase().includes(text.toUpperCase()) || list[i].name.first.toUpperCase().includes(text.toUpperCase()) || list[i].name.last.toUpperCase().includes(text.toUpperCase())) {
         partialList.push(list[i]);
      }
   }
   if (partialList.length === 0) {
      const noResults = document.querySelector('.student-list');
      noResults.innerHTML = `<h3>No results found for "${text}".</h3>`;
   } else {
      showPage(partialList, 1);
      addPagination(partialList);
   }
   return partialList;
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   
   // indices for the if statement below; the indices correspond to first and last student item index on the page
   const startIndex = page * 9 - 9;
   const endIndex = page * 9;

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {

         let studentInfo = document.createElement('li');

         studentInfo = `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.thumbnail} alt="Profile Picture">
               <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;

       studentList.insertAdjacentHTML('beforeend', studentInfo);
      }
   }

   //searches for matches from the search bar
   searchButton.addEventListener('submit', (e) => {
      e.preventDefault();
      search(input, data);
   });

   //searches for matches actively while typing
   input.addEventListener('keyup', () => {
      search(input, data);
   });

}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



function addPagination(list) {

   const numOfPages = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');

   linkList.innerHTML = '';
   if (numOfPages > 0) {

   for (let i = 0; i < numOfPages; i ++) {
      let buttons = document.createElement('li');
      buttons = `
      <li>
         <button type="button">${i + 1}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', buttons);
   }

   let firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      
      let clickedButton = e.target;

      // if pagination button is clicked on, perform the following
      if (clickedButton.tagName === 'BUTTON') {
         
         //set newly selected button class to active and clear previous button's class
         let previousActiveButton = document.querySelector('.active');
         previousActiveButton.className = '';

         clickedButton.className = '';

         clickedButton.className = 'active';
         showPage(list, clickedButton.textContent);
      }
   });
}
}


// Call functions

showPage(data, 1);
addPagination(data);

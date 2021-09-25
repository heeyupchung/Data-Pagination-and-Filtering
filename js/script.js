/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = page * 9 - 9;
   const endIndex = page * 9;

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {

         let studentInfo = document.createElement('li');

         studentInfo.innerHTML = `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${data[i].picture.thumbnail} alt="Profile Picture">
               <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
               <span class="email">${data[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${data[i].registered.date}</span>
            </div>
         </li>`;

       studentList.appendChild(studentInfo);
      }
   }

}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {

   const numOfPages = list.length / 9;
   let linkList = document.querySelector('.link-list');

   linkList.innerHTML = '';
   for (let i = 0; i < numOfPages; i ++) {
      let buttons = document.createElement('li');
      buttons.innerHTML = `
      <li>
         <button type="button">${i + 1}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', buttons.innerHTML);
   }

   let firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      
      let clickedButton = e.target;
      if (clickedButton.tagName === 'BUTTON') {
         
         let previousActiveButton = document.querySelector('.active');
         previousActiveButton.className = '';

         clickedButton.className = '';

         clickedButton.className = 'active';
         showPage(list, numOfPages);
      }
   });
}


// Call functions

showPage(data, 1);
addPagination(data);

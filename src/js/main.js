import Parser from './parser';
import data from './shri';

console.log(data);

document.addEventListener('DOMContentLoaded', function () {

  const mainNav = document.getElementsByClassName("js-menu");
  const navBarToggle = document.getElementById("js-navbar-toggle");

  navBarToggle.addEventListener("click", function () {
    for (let i = 0; i < mainNav.length; ++i) {
      const item = mainNav[i];  
      item.classList.toggle("active");
    }
  });

  
  const parser = new Parser({
    colors: data.colors,
    tags: data.tags,
  });

  const notesContainer = document.getElementById("notes");

  data.notes.reduce((notes, item) => {
    const note = parser.createNote(item);
    notesContainer.innerHTML += note;
    return notes.concat(note);
  }, []);

});
import Parser from './parser';
import data from './shri';
import Notes from '../ts/notes.ts';

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

  const notesContainer = document.getElementsByClassName("notes__content");
  const notesBlocks = document.getElementsByClassName("notes__title_blocks");

  data.colors.forEach((color) => {
    notesBlocks[0].innerHTML += createTitleBlock(color);
  })

  data.notes.forEach((item) => {
    const note = parser.createNote(item);
    notesContainer[0].innerHTML += note;
  }, []);

  Notes.factory(data.notes);

  const notes = new Notes;
  notes.getNoteSize();
});

function createTitleBlock({ color }) {
  return `
    <div class="block" style="background-color: ${color}"></div>
  `;
}
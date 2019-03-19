import Parser from './parser';
import data from './shri';

document.addEventListener('DOMContentLoaded', function () {

  const clearBtn = document.getElementsByClassName("search__clear");
  const search = document.getElementsByClassName("search__text");
  clearBtn[0].addEventListener("click", () => {
    search[0].value = "";
  })

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
    //return notes.concat(note);
  }, []);

});

function createTitleBlock({ color }) {
  return `
    <div class="block" style="background-color: ${color}"></div>
  `;
}
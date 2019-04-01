import Parser from './parser';
import staticData from './shri';
import {
  getNotes,
  getArchiveNotes,
  getNotesByColor,
  addNote,
  deleteNote,
  updateNote,
  changeNoteStatus,
} from '../service/main';

document.addEventListener('DOMContentLoaded', function () {

  const clearBtn = document.getElementsByClassName("search__clear");
  const search = document.getElementsByClassName("search__text");
  clearBtn[0].addEventListener("click", () => {
    search[0].value = "";
  });

  getNotes()
    .then(data => initPage(data));

  //getNotesByColor({
  //  payload: {
  //    color: 1,
  //  }
  //});

  // const newNote = {
  //   "type": "list",
  //   "title": "Не забыть выгулять Сиба-Ину 12",
  //   "color": 3,
  //   "created": 1520160803000,
  //   items: [
  //     "1", "2", "3", "4"
  //   ]
  // };

  // addNote({
  //   payload: {
  //     card: newNote,
  //   }
  // }).then(() => getNotes());

  // deleteNote({
  //   payload: {
  //     id: 10,
  //   }
  // });

  // updateNote({
  //   payload: {
  //     note: newNote,
  //     id: 8,
  //   }
  // });

  // changeNoteStatus({
  //   payload: {
  //     id: 5,
  //     inArchive: true,
  //   }
  // });

});

function initPage(notesData) {
  const mainNav = document.getElementsByClassName('js-menu');
  const navBarToggle = document.getElementById('js-navbar-toggle');

  navBarToggle.addEventListener('click', function () {
    for (let i = 0; i < mainNav.length; ++i) {
      const item = mainNav[i];
      item.classList.toggle('active');
    }
  });

  const parser = new Parser({
    colors: staticData.colors,
    tags: staticData.tags,
  });

  const notesContainer = document.getElementsByClassName("notes__content");
  const notesBlocks = document.getElementsByClassName("notes__title_blocks");

  staticData.colors.forEach((color) => {
    notesBlocks[0].innerHTML += createTitleBlock(color);
  })

  notesData.forEach((item) => {
    const note = parser.createNote(item);
    notesContainer[0].innerHTML += note;
  }, []);

}

function createTitleBlock({ color }) {
  return `
    <div class="block" style="background-color: ${color}"></div>
  `;
}
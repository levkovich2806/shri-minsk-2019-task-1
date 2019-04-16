import React, { Component } from "react";
import classnames from "classnames";

import { addNote, updateNote } from "../../actions";

import styles from "./index.module.scss";
import Title from "./Title";
import Image from "./Image";
import Types from "./Types";
import Description from "./Description";
import TagList from "./TagList";

import { connect } from "react-redux";
import ColorPicker from "./ColorPicker";
import AttachmentsTypes from "./AttachmentsTypes";

class Modal extends Component {
  state = {
    type: "text",
    items: [],
    title: "",
    url: "",
    color: "",
    tags: [],
    text: "",
    attachmentType: "link",
    attachments: []
  };

  componentDidMount() {
    const { editableNoteId } = this.props;
    if (editableNoteId !== -1) {
      const { notesHash } = this.props;
      const noteData = notesHash[editableNoteId];
      if (noteData) {
        this.setEditNoteData(noteData);
      }
    }
  }

  setEditNoteData = data => {
    console.log(data);
    const { type, items, title, url, color, tags, text, attachments } = data;
    const editable = {
      type,
      title,
      url,
      color,
      tags,
      text
    };
    let attachmentType;
    if (attachments && attachments.length > 0) {
      attachmentType = attachments[0].type;
      editable.attachmentType = attachmentType;
      editable.attachments = attachments.map(({ url }) => url);
    }
    if (items && items.length > 0) {
      editable.items = items.map(({ text }) => text);
    }
    this.setState({ ...editable });
  };

  getTitle = () => {
    const { editableNoteId } = this.props;
    if (editableNoteId > -1) {
      return "Редактировать";
    }
    return "Добавить";
  };

  onTypeChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onSizeChange = e => {
    this.setState({
      size: e.target.value
    });
  };

  onColorChange = e => {
    this.setState({
      color: e.target.value
    });
  };

  onTagsChange = e => {
    const options = e.target.options;
    let tags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        tags.push(Number(options[i].value));
      }
    }
    this.setState({
      tags
    });
  };

  onDescriptionChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  onImageChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  addListItem = () => {
    this.setState({
      items: [...this.state.items, ""]
    });
  };

  createItemsList = () => {
    const { items } = this.state;
    return items.map((el, index) => (
      <div
        key={index}
        className={classnames(styles.form__attachments_item, styles.attachment)}
      >
        <input
          value={el ? el : ""}
          onChange={e => this.handleChangeItemList(e, index)}
          className={styles.attachment__text}
        />
        <input
          type="button"
          value="X"
          onClick={() => this.removeItemList(index)}
        />
      </div>
    ));
  };

  handleChangeItemList = (e, index) => {
    const { value } = e.target;
    let items = [...this.state.items];
    items[index] = value;
    this.setState({ items });
  };

  removeItemList = index => {
    let items = [...this.state.items];
    items.splice(index, 1);
    this.setState({ items });
  };

  createAttachmetList = () => {
    const { attachments } = this.state;
    return attachments.map((el, index) => (
      <div
        key={index}
        className={classnames(styles.form__attachments_item, styles.attachment)}
      >
        <input
          className={styles.attachment__text}
          value={el ? el : ""}
          onChange={e => this.handleChangeAttachment(e, index)}
        />
        <input
          type="button"
          value="X"
          onClick={() => this.removeAttachment(index)}
        />
      </div>
    ));
  };

  handleChangeAttachment = (e, index) => {
    const { value } = e.target;
    let attachments = [...this.state.attachments];
    attachments[index] = value;
    this.setState({ attachments });
  };

  removeAttachment = index => {
    let attachments = [...this.state.attachments];
    attachments.splice(index, 1);
    this.setState({ attachments });
  };

  addAttachment = () => {
    this.setState({
      attachments: [...this.state.attachments, ""]
    });
  };

  onAttachmentTypeChange = e => {
    this.setState({
      attachmentType: e.target.value
    });
  };

  createAttachmentObject = () => {
    const { attachments, attachmentType } = this.state;
    console.log(attachments, attachmentType);
    return attachments.map(url => {
      return {
        type: attachmentType,
        url
      };
    });
  };

  createListItemsObject = () => {
    const { items } = this.state;
    return items.map(text => {
      return {
        checked: false,
        text
      };
    });
  };

  sendNote = () => {
    const { editableNoteId } = this.props;
    let data = { ...{}, ...this.state };
    if (data.attachments && data.attachments.length > 0) {
      data.attachments = this.createAttachmentObject();
    } else {
      delete data.attachments;
    }
    if (data.type === "list" && data.items.length > 0) {
      data.items = this.createListItemsObject();
    } else {
      delete data.items;
    }

    if (data.type !== "image") {
      delete data.url;
    }

    delete data.attachmentType;

    console.log(data);

    this.props.hideModal();
    if (editableNoteId !== -1) {
      this.props.onUpdateNote(data);
    } else {
      this.props.onAddNote(data);
    }
  };

  updateNote = () => {
    this.props.hideModal();
    this.props.onUpdateNote(this.state);
  };

  render() {
    console.log(this.props, this.state);
    const { editableNoteId, hideModal, tags, colors } = this.props;
    const {
      type,
      title,
      url,
      color,
      tags: checkedTags,
      text,
      attachmentType
    } = this.state;

    const modalTitle = this.getTitle();

    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.main__content}>
            <div className={styles.main__title}>{modalTitle} заметку</div>
            <div className={classnames(styles.main__form, styles.form)}>
              <Types onChange={this.onTypeChange} type={type} />
              <Title onChange={this.onTitleChange} title={title} />
              {type === "image" && (
                <Image onChange={this.onImageChange} url={url} />
              )}
              {type === "list" && (
                <div className={styles.form__attachments}>
                  <div className={styles.form__attachments_title}>
                    Элементы списка:
                  </div>
                  {this.createItemsList()}
                  <input
                    type="button"
                    value="Добавить"
                    onClick={this.addListItem}
                  />
                </div>
              )}
              <ColorPicker
                colors={colors}
                onChange={this.onColorChange}
                checkedColor={color}
              />
              <TagList
                tags={tags}
                onChange={this.onTagsChange}
                checkedTags={checkedTags}
              />
              <Description
                onChange={this.onDescriptionChange}
                description={text}
              />
              <div className={styles.form__attachments}>
                <AttachmentsTypes
                  onChange={this.onAttachmentTypeChange}
                  attachmentType={attachmentType}
                />
                {this.createAttachmetList()}
                <input
                  type="button"
                  value="Добавить"
                  onClick={this.addAttachment}
                />
              </div>
            </div>
          </div>
          <div className={styles.main__actions}>
            {editableNoteId !== -1 ? (
              <span onClick={this.sendNote} className={styles.btn}>
                Сохранить
              </span>
            ) : (
              <span onClick={this.sendNote} className={styles.btn}>
                Добавить
              </span>
            )}
            <span
              onClick={hideModal}
              className={classnames(styles.btn, styles.btn__close)}
            >
              Закрыть
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tags: state.notes.tags,
    colors: state.notes.colors,
    notesHash: state.notes.notesHash,
    editableNoteId: state.notes.editableNoteId
  }),
  dispatch => ({
    onAddNote: note => {
      dispatch(
        addNote({
          payload: {
            note
          }
        })
      );
    },
    onUpdateNote: note => {
      dispatch(
        updateNote({
          payload: {
            note
          }
        })
      );
    }
  })
)(Modal);

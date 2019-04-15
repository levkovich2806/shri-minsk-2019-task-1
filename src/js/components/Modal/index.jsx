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
    size: "",
    items: [],
    title: "",
    url: "",
    color: "",
    tags: [],
    description: "",
    attachmentType: "link",
    attachments: []
  };

  getTitle = () => {
    const { action = "add" } = this.props;
    if (action === "add") {
      return "Добавить";
    }
    return "Редактировать";
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
      description: e.target.value
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
    return this.state.items.map((el, index) => (
      <div key={index}>
        <input value={el} onChange={e => this.handleChangeItemList(e, index)} />
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
    return this.state.attachments.map((el, index) => (
      <div key={index}>
        <input
          value={el}
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
  }

  addNote = () => {
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
    this.props.hideModal();
    this.props.addNote(data);
  };

  updateNote = () => {
    this.props.hideModal();
    this.props.updateNote(this.state);
  };

  render() {
    const { hideModal, action = "add", tags, colors } = this.props;
    const { type } = this.state;

    const title = this.getTitle();

    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.main__content}>
            <div className={styles.main__title}>{title} заметку</div>
            <div className={classnames(styles.main__form, styles.form)}>
              <Types onChange={this.onTypeChange} />
              <Title onChange={this.onTitleChange} />
              {type === "image" && <Image onChange={this.onImageChange} />}
              {/* <List /> */}
              {type === "list" && (
                <>
                  <div className={styles.form__listItemTitle}>
                    Элементы списка:
                  </div>
                  {this.createItemsList()}
                  <input
                    type="button"
                    value="Добавить"
                    onClick={this.addListItem}
                  />
                </>
              )}
              <ColorPicker colors={colors} onChange={this.onColorChange} />
              <TagList tags={tags} onChange={this.onTagsChange} />
              <Description onChange={this.onDescriptionChange} />
              <div className={styles.form__attachments}>
                <AttachmentsTypes onChange={this.onAttachmentTypeChange} />
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
            {action === "add" ? (
              <span onClick={this.addNote} className={styles.btn}>
                Добавить
              </span>
            ) : (
                <span onClick={this.updateNote} className={styles.btn}>
                  Сохранить
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
    colors: state.notes.colors
  }),
  dispatch => ({
    addNote: note => {
      dispatch(
        addNote({
          payload: {
            note
          }
        })
      );
    },
    updateNote: note => {
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

import React, { Component } from "react";
import NoteImage from "../NoteImage";

import NoteBlock from "../NoteBlock";
import NoteList from "../NoteList";

class NoteContent extends Component {
  render() {
    const {
      title,
      color,
      text,
      tags,
      reminder,
      type,
      created,
      url,
      items
    } = this.props;

    switch (type) {
      case "text":
        return <NoteBlock {...this.props} />;
      case "image":
        return (
          <>
            <NoteBlock
              modificator={["imageNote"]}
              content={<NoteImage url={url} />}
              blockType={"top"}
            />
            <NoteBlock
              {...this.props}
              modificator={["withTopBlock", "listContainer"]}
            />
          </>
        );
      case "list":
        return (
          <>
            <NoteBlock
              modificator={["listNotByu"]}
              title={title}
              color={color}
              blockType={"top"}
              content={<NoteList items={items} />}
            />
            <NoteBlock
              {...{ text, tags, reminder, created, items }}
              content={<NoteList items={items} checkedState={true} />}
              modificator={["withTopBlock", "listContainer"]}
            />
          </>
        );
      default:
        return <NoteBlock {...this.props} />;
    }
  }
}

export default NoteContent;

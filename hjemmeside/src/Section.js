import { Paper } from "@material-ui/core";
import React from "react";
import marked from 'marked'


function getMarkdownText(filename) {

  var rawMarkup = marked(filename, { sanitize: false, breaks:true });
  return { __html: rawMarkup };
}




function Section(props) {

  return <Paper color="primary" dangerouslySetInnerHTML={getMarkdownText(props.filename)} />
}

export default Section
function getColourFromPalette(colour) {
  if (colourPalette[colour] == null) {
    return colourPalette.black
  } else {
    return colourPalette[colour]
  }
}

function setNodeColor(node) {
  if (node.expanded || neighbours[node.id].length == 0) {
    return d3.color(getColourFromPalette(node.co)).darker(2)
  } else {
    return d3.color(getColourFromPalette(node.co))
  }
}

function getLinkAttribute(linkDatum, onNormal, onHighlighted, onTrack){ //}, onSourceHover) {
  //if (linkData.source.hovered) return onSourceHover
  if (linkDatum.tracked) return onTrack
  else if (linkDatum.hovered) return onHighlighted
  else return onNormal
}

function setLinkAttributes(link, linkDatum) {
  link
    .attr('stroke', getLinkAttribute(linkDatum, linkColor, linkColorHighlighted, linkColorTracked))
    .attr('stroke-width', getLinkAttribute(linkDatum, linkWidth, linkWidthHighlighted, linkWidthTracked))
}

function shortenName(name) {
  if (name.length > nodeTextLengthCap) {
    newName = name.slice(0, nodeTextLengthCap - 3) + "..."
    return newName
  }
  else {
    return name
  }
}
function getColourFromPalette(label) {
  if (colorPalette[label] == null) {
    return colorPalette.black
  } else {
    return colorPalette[label]
  }
}

function setNodeColor(node) {
  if (node.expanded || neighbours[node.id].length == 0) {
    return d3.color(getColourFromPalette(node.label)).darker(2)
  } else {
    return d3.color(getColourFromPalette(node.label))
  }
}

function getLinkAttribute(linkDatum, onNormal, onHighlighted, onTrack) { //}, onSourceHover) {
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

function roundReadable(val, type) {
  if (type == 'string') return val
  if (type == 'int') return val
  if (type == 'float') {
    if (val === 0) return 0;

    let isNegative = val < 0;
    val = Math.abs(val);

    let exponent = Math.floor(Math.log10(val));
    let factor = Math.pow(10, exponent - 1);

    let roundedval = Math.round(val / factor) * factor;

    // Handle floating point precision
    roundedval = parseFloat(roundedval.toPrecision(2));

    return isNegative ? -roundedval : roundedval;
  }
}

function collapseAndUpdate(u) {
  unshowed = [];
  collapse(u);
  saveOldPositions();
  arrangeTree();
  for (let v of unshowed) {
    dataNodes[v].x = dataNodes[u].x;
    dataNodes[v].y = dataNodes[u].y;
  }
  update();
}
function collapseAndUpdateandJump(u) {
  unshowed = [];
  collapse(u);
  saveOldPositions();
  arrangeTree();
  for (let v of unshowed) {
    dataNodes[v].x = dataNodes[u].x;
    dataNodes[v].y = dataNodes[u].y;
  }
  svg.transition().duration(duration).call(
    zoom.transform,
    d3.zoomIdentity.scale(1).translate(-dataNodes[u].y, -dataNodes[u].x)
  );
  update();
}

function expandAndUpdate(u) {
  expand(u);
  saveOldPositions();
  arrangeTree();
  svg.transition().duration(duration).call(
    zoom.transform,
    d3.zoomIdentity.scale(1).translate(-dataNodes[u].y, -dataNodes[u].x)
  );
  update();
}

function getTextWidth(text, fontSize = "12px", fontFamily = "sans-serif") {
  // Create a temporary SVG element to measure the text

  // Append a text element to the SVG
  let textElement = mainGraphics.append('text')
      .attr('font-size', fontSize)
      .attr('font-family', fontFamily)
      .text(text);

  // Get the computed length of the text
  let textWidth = textElement.node().getComputedTextLength();

  // Remove the temporary SVG element
  textElement.remove();

  return textWidth;
}

function set_dependency(datum){
  lastSearch.property("value", "[ " + datum.name + " ]")
  lastSearch.node().dispatchEvent(new Event('input'));
  
  getDependencyOn(datum.id)
  isSomeObserved = true;
}
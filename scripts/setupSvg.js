// append the svg object to the body of the page
// appends a 'group' element to 'svg'

var mainDiv = d3.select('body')
  .append('div')
  .style('display', 'flex')
  .style('flex-direction', 'column')
  .style('align-items', 'flex-start');

// append checkbox and label to mainDiv
advancedOptionsArray = []

// create a svg where everything except show advanced options tickbox is drawn on
var svg = mainDiv
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', [-width / 2, -height / 2, width, height]) // set the viewbox so that the origin is in the middle
  .style('float', 'left');

var foreignObjectCheckbox = svg.append('foreignObject')
  .attr('x', -width / 2)
  .attr('y', height / 2)
  .attr('width', 300)
  .attr('height', 30)
  .on("dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave contextmenu", function (event) {
    event.stopPropagation();
  });

var foreignObjectCheckboxDiv = foreignObjectCheckbox.append('xhtml:div')
  .style('display', 'flex')
  .style('align-items', 'center')
  .style('user-select', 'none');  // Prevent text selection

var showAdvancedOptionsTickbox = foreignObjectCheckboxDiv
  .append('input')
  .attr('type', 'checkbox')
  .attr('id', 'advancedOptionsInput');

showAdvancedOptionsTickbox.on("change", handleChangeShowAdvancedOptions);

var checkboxText = foreignObjectCheckboxDiv.append('label')
  .attr('for', 'advancedOptionsInput')
  .text("Show advanced options");

{
  let bbox = foreignObjectCheckboxDiv.node().getBoundingClientRect();
  let calculatedWidth = showAdvancedOptionsTickbox.node().getBoundingClientRect().width + checkboxText.node().getBoundingClientRect().width + 40;
  foreignObjectCheckbox
    .attr('width', calculatedWidth)
    .attr('height', bbox.height)
    .attr('y', height / 2 - bbox.height);
}

const zoom = d3.zoom()
  .on("zoom", (event) => {
    mainGraphics.attr("transform", event.transform);
  })
  .filter(function (event) {
    if (event.shiftKey) {

      const delta = event.deltaY;

      let wheelspeed = wheelScrollSpeed;
      if (event.altKey) {
        wheelspeed = wheelScrollSpeedFast;
      }

      if (delta > 0) {
        svg.call(
          zoom.transform,
          d3.zoomTransform(mainGraphics.node())  // Get the current zoom transform
            .translate(0, -wheelspeed)
        );
      } else if (delta < 0) {
        svg.call(
          zoom.transform,
          d3.zoomTransform(mainGraphics.node())  // Get the current zoom transform
            .translate(0, wheelspeed)
        );
      }
    }
    return !event.shiftKey
  })

svg.call(zoom)

var mainGraphics = svg
  .append('g')
mainGraphics.attr('transform', d3.zoomIdentity)

isSomeObserved = false;
// help tool bar code


// ICONS 
helpToolIcon = svg.append("g")
  .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + helpToolIconBoundaryDistance) + ")")

helpToolIcon
  .append("circle")
  .attr("r", iconCircleSize)
  .attr("cx", 12)
  .attr("cy", 12)
  .attr("fill", "white")
  .attr("opacity", 0)

helpToolIcon
  .append("path")
  .attr("d", "M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z")
  .attr("fill", "currentColor")

helpToolIcon
  .append("path")
  .attr("d", "M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z")
  .attr("fill", "currentColor")

helpToolIcon
  .append("path")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("d", "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z")
  .attr("fill", "currentColor")

// Three function that change the helpToolBar when user hover / move / leave a cell
function mouseoverhelpToolIcon(d) {
  if (!isColorLegendHovered && !isLegendHovered) {
    d3
      .select('#helpToolBar')
      .raise()
      .attr('display', 'inline')
  }
}
function mouseleavehelpToolIcon(d) {
  if (!isHelpToolBarHovered) {
    d3
      .select('#helpToolBar')
      .attr('display', 'none')
  }
}

helpToolIcon
  .on("mouseover", mouseoverhelpToolIcon)
  .on("mouseleave", mouseleavehelpToolIcon)

// Legend tool bar Code

legendIcon = svg.append("g")
  .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 4 * iconCircleSize + helpToolIconBoundaryDistance) + ")")

advancedOptionsArray.push([legendIcon, 'inline'])

legendIcon
  .append("circle")
  .attr("r", iconCircleSize)
  .attr("cx", 12)
  .attr("cy", 12)
  .attr("fill", "white")
  .attr("opacity", 0)

legendIcon
  .append("path")
  .attr("d", "M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44771 7 6 6.55228 6 6Z")
  .attr("fill", "currentColor")
legendIcon
  .append("path")
  .attr("d", "M6 10C6 9.44771 6.44772 9 7 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10Z")
  .attr("fill", "currentColor")
legendIcon
  .append("path")
  .attr("d", "M7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44771 15 7 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H7Z")
  .attr("fill", "currentColor")
legendIcon
  .append("path")
  .attr("d", "M6 18C6 17.4477 6.44772 17 7 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H7C6.44772 19 6 18.5523 6 18Z")
  .attr("fill", "currentColor")
legendIcon
  .append("path")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("d", "M2 4C2 2.34315 3.34315 1 5 1H19C20.6569 1 22 2.34315 22 4V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V4ZM5 3H19C19.5523 3 20 3.44771 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44771 3 5 3Z")
  .attr("fill", "currentColor")

function mouseoverlegendToolIcon(d) {
  if (!isHelpToolBarHovered && !isColorLegendHovered) {
    d3
      .select('#legendToolBar')
      .raise()
      .attr('display', 'inline')
  }
}
function mouseleavelegendToolIcon(d) {
  if (!isLegendHovered) {
    d3
      .select('#legendToolBar')
      .attr('display', 'none')
  }
}
legendIcon
  .on("mouseover", mouseoverlegendToolIcon)
  .on("mouseleave", mouseleavelegendToolIcon)

// Color legend tool bar Code
let colorLegendIcon = svg.append("g")
  .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 2 * iconCircleSize + helpToolIconBoundaryDistance) + ")")

colorLegendIcon
  .append("circle")
  .attr("r", iconCircleSize)
  .attr("cx", 12)
  .attr("cy", 12)
  .attr("fill", "white")
  .attr("opacity", 0)

colorLegendIcon
  .append("path")
  .attr("d", "M12 7.75736L7.75736 12L12 16.2426L16.2426 12L12 7.75736Z")
  .attr("fill", "currentColor")

colorLegendIcon
  .append("path")
  .attr("fill-rule", "evenodd")
  .attr("clip-rule", "evenodd")
  .attr("d", "M3 4C3 2.34315 4.34315 1 6 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4ZM6 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z")
  .attr("fill", "currentColor")

function mouseovercolorLegendIcon(d) {
  console.log(isHelpToolBarHovered)
  if (!isHelpToolBarHovered && !isLegendHovered) {
    d3
      .select('#colorLegendToolBar')
      .raise()
      .attr('display', 'inline')
  }
}
function mouseleavecolorLegendIcon(d) {
  if (!isColorLegendHovered) {
    d3
      .select('#colorLegendToolBar')
      .attr('display', 'none')
  }
}

colorLegendIcon
  .on("mouseover", mouseovercolorLegendIcon)
  .on("mouseleave", mouseleavecolorLegendIcon)



// Create the help toolbar as a foreign object
let helpToolBar = svg
  .append('g')
  .attr("transform", "translate(" + (width / 2 - barWidths - helpToolIconBoundaryDistance) + ", " + (-height / 2 + helpToolIconBoundaryDistance) + ")")
  .append('foreignObject')
  .attr('id', 'helpToolBar')
  .attr('width', barWidths)
  .attr('height', barHeights + 2 * barPaddings + 'px')
  .style('border', '1px solid black')
  .style('border-radius', `${barRadii}` + 'px')
  .style('background', 'white')
  .append('xhtml:div')
  .style('width', barWidths)
  .style('height', barHeights + 'px')
  .style('font-weight', 300)
  .style('overflow', 'auto')
  .style('padding', barPaddings + 'px')

d3.select('#helpToolBar').on('wheel mousedown touchstart dblclick', function (event) {
  event.stopPropagation();
});

// Add the message text
helpToolBar.append('div')
  .text("Click and drag to move around. Click on nodes to expand their neighbors. If a node is darker, it is already expanded or has no neighbors. Click on links to track them, which marks them. Click again to untrack. \n \n Use the scroll wheel to zoom in and out. Holding shift while scrolling moves up and down instead. Moreover, holding the Alt key speeds up this scrolling. Hover over a node to show some of its properties. \n \n To enable advanced options, tick the tickbox. Some additional properties of nodes are now shown when hovering over them. An option to collapse all nodes becomes available on the bottom right. On the top left, a scoreboard displaying nodes with the highest indegree appears. Below it, a search tool to find nodes by name becomes visible. Search for a node by name, click on the search entry to expand the node, and center the viewbox on it. \n \n If you hold the Alt key when you click on the search entry, the node is not centered on but instead becomes 'observed' (the observed node's name is in the black box just above the searchbar). The last property, when hovering over an arbitrary node, now shows the dependency on the observed node. This means that in the construction of an entry in the library, the observed node's entry was used somewhere. \n \n If you want to observe a node without expanding and centering on it, click on it while holding the Alt key (or find it in the searchbar and click on the entry while holding the Alt key.)")
  .style('white-space', 'pre-line');  // Preserve newlines in the message

var isHelpToolBarHovered = false
function mouseoverhelpToolBar(d) {
  isHelpToolBarHovered = true
  d3
    .select('#helpToolBar')
    .raise()
    .attr('display', 'inline')
}
function mouseleavehelpToolBar(d) {
  isHelpToolBarHovered = false
  d3
    .select('#helpToolBar')
    .attr('display', 'none')
}

helpToolBar
  .on("mouseover", mouseoverhelpToolBar)
  .on("mouseleave", mouseleavehelpToolBar)

d3
  .select('#helpToolBar')
  .attr('display', 'none')

let colorLegendToolBar = svg
  .append('g')
  .attr("transform", "translate(" + (width / 2 - colorLegendToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 2 * iconCircleSize + helpToolIconBoundaryDistance) + ")")
  .append('foreignObject')
  .attr('id', 'colorLegendToolBar')
  .attr('width', barWidths)
  .attr('height', barHeights + 2 * barPaddings + 'px')
  .style('border', '1px solid black')
  .style('border-radius', `${barRadii}` + 'px')

d3.select('#colorLegendToolBar').on('wheel mousedown touchstart dblclick', function (event) {
  event.stopPropagation();
});

let colorLegendForeignObject = colorLegendToolBar
  .append('xhtml:div')
  .style('width', barWidths)
  .style('background', 'white')
  .style('font-weight', 300)
  .style('overflow', 'auto')  // Add scrollbar if content is too long
  .style('padding', barPaddings + 'px')  // Optional: Add some padding

// Add the message text
colorLegendForeignObject.append('div')
  .style('font-weight', 'bold')
  .style('margin-bottom', '10px')
  .text('Color Legend');

// Append each (label, color) pair
Object.entries(colorPalette).forEach(([label, color]) => {
  var legendItem = colorLegendForeignObject.append('div')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('margin-bottom', '5px');

  legendItem.append('span')
    .style('display', 'inline-block')
    .style('width', '12px')
    .style('height', '12px')
    .style('background-color', color)
    .style('border-radius', '50%')
    .style('margin-right', '8px');

  legendItem.append('span')
    .text(label);
});

colorLegendToolBar.attr('height', colorLegendForeignObject.node().getBoundingClientRect().height)

var isColorLegendHovered = false
function mouseovercolorLegendToolBar(d) {

  isColorLegendHovered = true
  d3
    .select('#colorLegendToolBar')
    .raise()
    .attr('display', 'inline')

}
function mouseleavecolorLegendToolBar(d) {
  isColorLegendHovered = false
  d3
    .select('#colorLegendToolBar')
    .attr('display', 'none')
}

colorLegendToolBar
  .on("mouseover", mouseovercolorLegendToolBar)
  .on("mouseleave", mouseleavecolorLegendToolBar)

d3
  .select('#colorLegendToolBar')
  .attr('display', 'none')



// Create the help toolbar as a foreign object
let legendToolBar = svg
  .append('g')
  .attr("transform", "translate(" + (width / 2 - legendToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 4 * iconCircleSize + helpToolIconBoundaryDistance) + ")")
  .append('foreignObject')
  .attr('id', 'legendToolBar')
  .attr('width', barWidths)
  .attr('height', barHeights + 2 * barPaddings + 'px')
  .style('border', '1px solid black')
  .style('border-radius', `${barRadii}` + 'px')
  .style('background', 'white')

let legendToolBarForeignObject = legendToolBar
  .append('xhtml:div')
  .style('width', barWidths)
  .style('font-weight', 300)
  .style('overflow', 'auto')
  .style('padding', barPaddings + 'px')

d3.select('#legendToolBar').on('wheel mousedown touchstart dblclick', function (event) {
  event.stopPropagation();
});

legendToolBarForeignObject.append('style').text(`
      a:link {
        color: blue;
        text-decoration: none;
      }
      a:visited {
        color: blue;
        text-decoration: none;
      }
      a:hover {
        color: darkblue;
        text-decoration: underline;
      }
      a:active {
        color: darkblue;
        text-decoration: underline;
      }
    `);

// Add the message text
legendToolBarForeignObject.append('div')
  .html(`<a href="https://en.wikipedia.org/wiki/Betweenness_centrality">Betweenness,</a> or betweenness centrality, is roughly the measure of how central a node is when studying shortest paths. 

  <a href="https://en.wikipedia.org/wiki/Degree_(graph_theory)">Degree</a> is the sum of indegree and outdegree. <a href="https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree">Indegree</a> is the count of all incoming edges. <a href="https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree">Outdegree</a> is the count of all outgoing edges.

  <a href="https://en.wikipedia.org/wiki/Eigenvector_centrality">Eigencentrality,</a> or eigenvector centrality, is another measure of centrality that takes into account how central are the node's neighbours. It is calculated using the eigenvectors of the adjacency matrix. 
  
  <a href="https://en.wikipedia.org/wiki/PageRank">Pagerank</a> is a variant of eigencentrality developed by Google.`)
  .style('white-space', 'pre-line');  // Preserve newlines in the message

legendHeight = Math.min(barHeights, legendToolBarForeignObject.node().getBoundingClientRect().height)
legendToolBar.attr('height', legendHeight + 'px')
legendToolBarForeignObject.style('height', legendHeight + 'px')

//advancedOptionsArray.push([legendToolBar, 'inline'])

var isLegendHovered = false
function mouseoverlegendToolBar(d) {

  isLegendHovered = true
  d3
    .select('#legendToolBar')
    .raise()
    .attr('display', 'inline')

}
function mouseleavelegendToolBar(d) {
  isLegendHovered = false
  d3
    .select('#legendToolBar')
    .attr('display', 'none')
}

legendToolBar
  .on("mouseover", mouseoverlegendToolBar)
  .on("mouseleave", mouseleavelegendToolBar)

d3
  .select('#legendToolBar')
  .attr('display', 'none')


{
  // top indegree scoreboard
  let indices = dataNodes.map((_, index) => index);
  const sortedDataNodesIndegree = indices.sort((a, b) => dataNodes[b].in_degree - dataNodes[a].in_degree);

  const topNodes = sortedDataNodesIndegree.slice(0, Math.min(sortedDataNodesIndegree.length, scoreboardNumberOfEntries));

  scoreboardGroup = svg.append("g")
    .attr("class", "scoreboard")
    .attr("transform", "translate(" + (-width / 2 + outlineRadius + scoreboardPadding.left) + ", " + (-height / 2 + outlineRadius + scoreboardPadding.top) + ")")

  advancedOptionsArray.push([scoreboardGroup, 'inline']);

  scoreboardGroup.on("dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave contextmenu", function (event) {
    event.stopPropagation();
  });

  let scoreboardRectangle = scoreboardGroup.append("rect")
    .attr("x", -scoreboardPadding.left)
    .attr("y", -scoreboardPadding.top)
    .attr("height", (topNodes.length + 1) * scoreboardLineHeight + scoreboardPadding.top + scoreboardPadding.bottom)
    .attr("rx", outlineRadius)
    .attr("ry", outlineRadius)
    .attr("fill", "white")
    .attr("stroke", "#333333")
    .attr("stroke-width", outlineRadius);

  // append header
  header = scoreboardGroup
    .append("text")
    .attr("x", 0)
    .attr("y", (d, i) => scoreboardLineHeight - (1 - scoreboardTextHeightRatio) * scoreboardLineHeight)
    .append("tspan")
    .style("font-weight", 900)
    .text('Nodes with largest indegree ')
    .style("font-size", scoreboardLineHeight * scoreboardTextHeightRatio)
    .style("fill", "black");

  scoreboardText = scoreboardGroup.selectAll("text.scoreboardentries")
    .data(topNodes)
    .enter()
    .append("text")
    .attr("class", "scoreboardentries")
    .attr("x", 0)
    .attr("y", (d, i) => (i + 2) * scoreboardLineHeight - (1 - scoreboardTextHeightRatio) / 2 * scoreboardLineHeight - dividerThickness) // TODO fix scaling of scoreboardTextHeightRatio

  // append tspan for rank
  scoreboardNames = scoreboardText
    .append("tspan")
    .style("font-weight", "bold")
    .text((d, i) => `${i + 1}. `)
    .style("font-size", `${scoreboardLineHeight * scoreboardTextHeightRatio}px`)
    .style("fill", "#555555");

  // append names tspan
  scoreboardNames = scoreboardText
    .append("tspan")
    .style("font-weight", "bold")
    .text(d => `${dataNodes[d].name}: `)
    .style("font-size", scoreboardLineHeight * scoreboardTextHeightRatio)
    .style("fill", "#555555");

  // Append values tspan (not bold)
  scoreboardIndegrees = scoreboardText
    .append("tspan")
    .style("font-weight", "normal")
    .style("font-size", scoreboardLineHeight * scoreboardTextHeightRatio)
    .text(d => `${dataNodes[d].in_degree}`) // Second part not in bold
    .style("fill", "#888888");

  let calculatedScoreboardWidth = 0

  header.each(function () {
    let textNode = d3.select(this).node();
    const computedLength = textNode.getComputedTextLength();

    if (computedLength > calculatedScoreboardWidth) {
      calculatedScoreboardWidth = computedLength;
    }
  });

  scoreboardText.each(function () {
    let textNode = d3.select(this).node();
    const computedLength = textNode.getComputedTextLength();

    if (computedLength > calculatedScoreboardWidth) {
      calculatedScoreboardWidth = computedLength;
    }
  });

  scoreboardRectangle
    .attr("width", calculatedScoreboardWidth + scoreboardPadding.left + scoreboardPadding.right)

  scoreboardGroup
    .append("line")
    .attr("class", "headerDivider")
    .attr("x1", -scoreboardPadding.left)
    .attr("x2", calculatedScoreboardWidth + scoreboardPadding.right)
    .attr("y1", scoreboardLineHeight)
    .attr("y2", scoreboardLineHeight)
    .attr("stroke", "black")
    .attr("stroke-width", outlineRadius)

  scoreboardGroup.selectAll("line.divider")
    .data(topNodes.slice(1))
    .enter()
    .append("line")
    .attr("class", "divider")
    .attr("x1", -scoreboardPadding.left)
    .attr("x2", calculatedScoreboardWidth + scoreboardPadding.right)
    .attr("y1", (d, i) => (i + 2) * scoreboardLineHeight)
    .attr("y2", (d, i) => (i + 2) * scoreboardLineHeight)
    .attr("stroke", "black")
    .attr("stroke-width", dividerThickness)

  let scoreboardBottomY = 0;
  let scoreboardBbox = scoreboardRectangle.node().getBBox();

  scoreboardBottomY = scoreboardBbox.y + scoreboardBbox.height;

  // search bar
  // again we use foreignObject to use html elements
  foreignObjectSearchbar = svg.append("foreignObject")
    .attr('x', -width / 2 + 2)
    .attr('y', scoreboardBottomY - height / 2 + 20)
    .attr("width", calculatedScoreboardWidth + scoreboardPadding.left + scoreboardPadding.right + searchbarRadius * 2) // note: when foreign objects overlap the upper ones disable input to lower ones
  //.attr("height", 12 + scoreboardPadding.bottom + scoreboardPadding.top)


  divSearchbar = foreignObjectSearchbar
    .append("xhtml:div")
    .style("font-family", "sans-serif")
    .style("font-size", 15);

  advancedOptionsArray.push([foreignObjectSearchbar, 'inline']);

  lastSearch = divSearchbar.append("xhtml:textarea")
    .attr("type", "text")
    .attr("readonly", true) // make it immutable
    .style("background-color", "black")
    .style("color", "white")
    .style("border", `${outlineRadius}px solid black`)
    .style("border-radius", `${searchbarRadius}px`)
    .style("padding-top", `${scoreboardPadding.top}px`)
    .style("padding-right", `${scoreboardPadding.right}px`)
    .style("padding-bottom", `${scoreboardPadding.bottom}px`)
    .style("padding-left", `${scoreboardPadding.left}px`)
    .property("value", "[  ]")
    .style("width", `${calculatedScoreboardWidth}px`)
    .style("outline", "none") // Remove any default outline
    .style("box-shadow", "none")
    .style("text-align", "center")
    .attr("rows", 1)
    .style("resize", "none")
    .style("overflow-wrap", "break-word")
    .on("input", function () {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    });
  lastSearch.on("dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave contextmenu", function (event) {
    event.stopPropagation();
  });

  searchInput = divSearchbar.append("input")
    .attr("type", "text")
    .attr("id", "searchInput")
    .attr("placeholder", "Search entries by name...")
    .style("display", "block")
    .style("padding-top", `${scoreboardPadding.top}px`)
    .style("padding-right", `${scoreboardPadding.right}px`)
    .style("padding-bottom", `${scoreboardPadding.bottom}px`)
    .style("padding-left", `${scoreboardPadding.left}px`)
    .style("border", `${outlineRadius}px solid black`)
    .style("border-radius", `${searchbarRadius}px`)
    .style("width", `${calculatedScoreboardWidth}px`)
    .style("outline", "none") // Remove any default outline
    .style("box-shadow", "none");

  foreignObjectSearchbar
    .attr("height", divSearchbar.node().getBoundingClientRect().height)
    .attr("width", searchInput.node().getBoundingClientRect().width)

  // Create and append the unordered list inside the foreignObject
  const dataList = divSearchbar.append("ul")
    .attr("id", "dataList")
    .style("list-style", "none")
    .style("display", "none")
    .style("margin", "0")
    .style("padding", "0")

  // Function to render the list
  function renderList(filteredData) {
    const list = d3.select("#dataList");
    list.selectAll("li").remove();  // clear the list

    if (filteredData.length === 0) {
      foreignObjectSearchbar
        .attr("height", divSearchbar.node().getBoundingClientRect().height)
      dataList.style("display", "none")
      return;  // if there are no filtered results, do not append any list items
    }

    var clickTimeout;
    dataList.style("display", "inline")
    list.selectAll("li")
      .data(filteredData)
      .enter()
      .append("li")
      .text(d => "" + d.name)
      .style("padding-top", `${scoreboardPadding.top}px`)
      .style("padding-right", `${scoreboardPadding.right}px`)
      .style("padding-bottom", `${scoreboardPadding.bottom}px`)
      .style("padding-left", `${scoreboardPadding.left}px`)
      .style("font-size", "12px")
      .style("color", "grey")
      .style("border", "1px solid black")
      .style("border-radius", "2px")
      .style("background-color", "white")
      .on("dblclick", function (event) { clearTimeout(clickTimeout); event.stopPropagation(); })
      .on("click", function (event, datum) {
        event.stopPropagation();
        if (event.altKey) {
          set_dependency(datum);
        } else {
          expandById(datum.id);
          clickTimeout = setTimeout(() => {

            renderList([]);
            searchInput.node().value = "";
            foreignObjectSearchbar
              .attr("height", divSearchbar.node().getBoundingClientRect().height)
          }, 500); // Adjust the timeout duration as needed

        }


      })
      // disable unnecessary propagation of events to the bottom svg
      .on("mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave contextmenu", function (event) {
        event.stopPropagation();
      });

    foreignObjectSearchbar
      .attr("height", divSearchbar.node().getBoundingClientRect().height)
  }

  // Create an array of indices sorted by the length of the name property
  // this is used to somewhat optimize the search
  const dataNodesIndices = dataNodes.map((_, index) => index).sort((a, b) => {
    const nameA = dataNodes[a].name;
    const nameB = dataNodes[b].name;

    // First sort by length of name
    if (nameA.length !== nameB.length) {
      return nameA.length - nameB.length;
    }

    // If lengths are the same, sort lexicographically
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // search bar event listener
  searchInput.on("input", function () {
    const searchText = this.value.toLowerCase();
    if (searchText === "") {
      renderList([]);  // if the search input is empty, clear the list
    } else {
      let filteredData = [];
      for (let i = 0; i < dataNodes.length; i++) {
        const node = dataNodes[dataNodesIndices[i]];
        if (!node.removed && node.name.toLowerCase().includes(searchText)) {
          filteredData.push(dataNodes[dataNodesIndices[i]]);
          // find only 60 entries
          if (filteredData.length > 60) break;
        }
      }
      renderList(filteredData);
    }
  });
  searchInput.on("dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave contextmenu", function (event) {
    event.stopPropagation();
  });

  // initial rendering with an empty list
  renderList([]);
}

{
  // create a button by appending a foreignObject, add a div and then a button
  foreignObjectCollapseAllButton = svg.append('foreignObject')
    .attr('width', collapseAllButtonWidth)
    .attr('height', collapseAllButtonHeight)
    .attr('x', width / 2 - collapseAllButtonWidth)
    .attr('y', height / 2 - collapseAllButtonHeight)

  advancedOptionsArray.push([foreignObjectCollapseAllButton, 'inline']);

  collapseAllButton = foreignObjectCollapseAllButton.append('xhtml:button')
    .text('Collapse All')
    .attr('class', 'collapse-button');

  collapseAllButton
    .style('font-weight', 'bold')
    .style('padding', '3px')
    .style('background-color', 'white')
    .style('color', '#000')
    .style('border', '2px solid #000')
    .style('border-radius', '3px')
    .style('font-size', '10px')
    .style('font-family', 'sans-serif')
    .style('cursor', 'pointer')

  collapseAllButton.on('click', function () {
    collapseAndUpdateandJump(rootid);
  });

  
  foreignObjectCollapseAllButton
  .attr('x', width / 2 - foreignObjectCollapseAllButton.node().getBoundingClientRect().width - 10)
  .attr('y', height / 2 - foreignObjectCollapseAllButton.node().getBoundingClientRect().height - 10)
  //.attr('x', width / 2 - collapseAllButton.node().getBoundingClientRect().width - 10)
  //.attr('y', height / 2 - collapseAllButton.node().getBoundingClientRect().height - 20)
}

function handleChangeShowAdvancedOptions() {
  if (showAdvancedOptionsTickbox.property('checked')) {
    // box is ticked
    advancedOptionsArray.forEach(([advancedOptionsElement, value]) => {
      advancedOptionsElement.attr('display', value);
    });
  } else {
    // box is not ticked
    advancedOptionsArray.forEach(([advancedOptionsElement, _]) => {
      advancedOptionsElement.attr('display', 'none');
    });
  }
}
handleChangeShowAdvancedOptions();

//var optionsMenu = d3.select("body").append("div").attr('class', 'optionsMenu')
//var inputShowOnlyNecessary = optionsMenu
//  .append('label')
//      .attr('for',function(d,i){ return 'a'+i; })
//      .text('Show only necessary links (recommended when viewing a large number of nodes):')
//  .append("input")
//      .attr("type", "checkbox")
//      .attr("id", function(d,i) { return 'a'+i; })
//      .attr("onClick", "change(this)");
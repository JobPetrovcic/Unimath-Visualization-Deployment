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

var checkboxContainer = mainDiv.append('div')
  .style('display', 'flex')
  .style('align-items', 'center');

// create a "Show advanced options" tickbox
var showAdvancedOptionsTickbox = checkboxContainer
  .append('input')
  .attr('type', 'checkbox')
  .attr('id', 'advancedOptionsInput');

showAdvancedOptionsTickbox.on("change", handleChangeShowAdvancedOptions);

checkboxContainer.append('label')
  .attr('for', 'advancedOptionsInput')
  .text("Show advanced options");

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
{
  helpToolIcon = svg.append("g")
    .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + helpToolIconBoundaryDistance) + ")")

  helpToolIcon
    .append("circle")
    .attr("r", helpToolIconCircleSize)
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
    d3
      .select('#helpToolBar')
      .raise()
      .attr('display', 'inline')
  }
  function mouseleavehelpToolIcon(d) {
    d3
      .select('#helpToolBar')
      .attr('display', 'none')
  }

  helpToolIcon
    .on("mouseover", mouseoverhelpToolIcon)
    .on("mouseleave", mouseleavehelpToolIcon)

  // create a helpToolBar
  var helpToolBar = svg
    .append('g')
    .attr("transform", "translate(" + (width / 2 - helpToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + helpToolIconBoundaryDistance) + ")")
    .append('svg')
    .attr('id', 'helpToolBar')
    .append('g')

  helpToolbarTextRectangle = helpToolBar
    .append('rect')
    .attr('width', helpToolBarWidth)
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .style('rx', '3px')
    .attr('fill', 'white')
    .attr('font-weight', 300)

  let useMessage = "Click and drag to move around. Click on nodes to expand their neighbors. If a node is darker, it is already expanded or has no neighbors. Click on links to track them, which marks them. Click again to untrack. \n \n Use the scroll wheel to zoom in and out. Holding shift while scrolling moves up and down instead. Moreover, holding the Alt key speeds up this scrolling. Hover over a node to show some of its properties. \n \n To enable advanced options, tick the tickbox. Some additional properties of nodes are now shown when hovering over them. An option to collapse all nodes becomes available on the bottom right. On the top left, a scoreboard displaying nodes with the highest indegree appears. Below it, a search tool to find nodes by name becomes visible. Search for a node by name, click on the search entry to expand the node, and center the viewbox on it. \n \n If you hold shift when you click on the search entry, the node is not centered on but instead becomes 'observed' (the observed node's name is in the black box just above the searchbar). The last property, when hovering over an arbitrary node, now shows the dependency on the observed node. This means that in the construction of an entry in the library, the observed node's entry was used somewhere. \n \n If you want to observe a node without expanding and centering on it, click on it while holding shift or find it in the searchbar and click on the entry while holding shift."

  {
    let words = useMessage.split(" ").reverse()
    let line = []
    let lineNumber = 0

    let text = helpToolBar
      .append("text")
      .text(null)

    let tspan = text
      .append("tspan")
      .attr("x", helpToolBarPaddingX)
      .attr("y", helpToolBarPaddingY)

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (word == "\n" || tspan.node().getComputedTextLength() > helpToolBarWidth - 2 * helpToolBarPaddingX) {
        line.pop();
        tspan.text(line.join(" "));
        if (word == "\n") line = []
        else line = [word]

        tspan = text
          .append("tspan")
          .attr("x", helpToolBarPaddingX)
          .attr("y", helpToolBarPaddingY)
          .attr("dy", ++lineNumber * helpToolBarLineHeight)
          .text(word);
      }
    }

    helpToolbarTextRectangle
      .attr("height", lineNumber * helpToolBarLineHeight + 2 * helpToolBarPaddingY)


  }
  d3
    .select('#helpToolBar')
    .attr('display', 'none')
}

// Color legend tool bar Code
{
  let colorLegendIcon = svg.append("g")
    .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 3 * helpToolIconCircleSize + helpToolIconBoundaryDistance) + ")")

  colorLegendIcon
    .append("circle")
    .attr("r", helpToolIconCircleSize)
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

  function mouseovercolorLegendToolBar(d) {
    d3
      .select('#colorLegendToolBar')
      .raise()
      .attr('display', 'inline')
  }
  function mouseleavecolorLegendToolBar(d) {
    if (!isColorLegendHovered) {
      d3
        .select('#colorLegendToolBar')
        .attr('display', 'none')
    }
  }

  colorLegendIcon
    .on("mouseover", mouseovercolorLegendToolBar)
    .on("mouseleave", mouseleavecolorLegendToolBar)

  let colorLegendToolBar = svg
    .append('g')
    .attr("transform", "translate(" + (width / 2 - colorLegendToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 3 * helpToolIconCircleSize + helpToolIconBoundaryDistance) + ")")
    .append('svg')
    .attr('id', 'colorLegendToolBar')
    .append('g')


  colorLegendToolBarTextRectangle = colorLegendToolBar
    .append('rect')
    .attr('width', colorLegendToolBarWidth)
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .style('rx', '3px')
    .attr('fill', 'white')
    .attr('font-weight', 300)

  // add text to color legend toolbar
  {
    let text = colorLegendToolBar
      .append("text")
      .text(null)

    let textElements = [{
      "word": "Color",
      "iscolor": false,
    },
    {
      "word": "legend",
      "iscolor": false,
    },
    {
      "word": "\n",
      "iscolor": false,
    }]
    for (const [label, color] of Object.entries(colorPalette)) {
      textElements.push({
        "color": color,
        "iscolor": true,
      })

      textElements.push({
        "word": label + " ",
        "iscolor": false,
      })


      textElements.push({
        "word": "\n",
        "iscolor": true,
      })
    }

    let lines = [] // list of list of tspans

    function getLineLength(ind) {
      let ret = 0

      for (let l of lines[ind]) {
        //debugger;
        ret += l.node().getComputedTextLength()
        ret += spaceGap
      }
      return ret
    }

    let isNewLine = true
    let currentWords = []

    function packWords() {
      let ret = null
      if (currentWords.length > 0) {

        ret = text
          .append("tspan")
          .text(currentWords.join(" "))

        lines[lines.length - 1].push(ret)
        currentWords = []
      }
      return ret
    }
    for (i = 0; i < textElements.length; ++i) {
      let element = textElements[i]
      let added = null
      if (isNewLine) {
        lines.push([])
        isNewLine = false
      }
      if (element.word == "\n") {
        packWords()

        isNewLine = true
        continue
      }
      else if (element.iscolor) {
        packWords()

        added = text
          .append('tspan')
          .text('⬤')
          .style('fill', element.color);  // Color of the circle*/
      }
      else {
        currentWords.push(element.word)
        added = text
          .append("tspan")
          .text(currentWords.join(" "))
      }
      lines[lines.length - 1].push(added)

      if (getLineLength(lines.length - 1) > colorLegendToolBarWidth - 2 * helpToolBarPaddingX) {
        if (element.iscolor) {
          added.remove()
        }
        else {
          currentWords.pop()
          added.remove()
          lines[lines.length - 1].pop()
          packWords()
        }

        --i

        isNewLine = true
      }
      else {
        if (element.iscolor);
        else {
          added.remove()
          lines[lines.length - 1].pop()
        }
      }
    }
    packWords()

    let lineNumber = 0
    for (line of lines) {
      currentOffset = 0
      for (span of line) {
        span
          .attr("x", helpToolBarPaddingX)
          .attr("y", helpToolBarPaddingY)
          .attr("dy", lineNumber * helpToolBarLineHeight)
          .attr("dx", currentOffset)
        currentOffset += span.node().getComputedTextLength() + spaceGap;
      }
      ++lineNumber
    }

    colorLegendToolBarTextRectangle
      .attr("height", (lineNumber - 1) * helpToolBarLineHeight + 2 * helpToolBarPaddingY)

    var isColorLegendHovered = false
    function mouseovercolorLegendToolBarTextRectangle(d) {
      isColorLegendHovered = true
      d3
        .select('#colorLegendToolBar')
        .raise()
        .attr('display', 'inline')
    }
    function mouseleavecolorLegendToolBarTextRectangle(d) {
      isColorLegendHovered = false
      d3
        .select('#colorLegendToolBar')
        .attr('display', 'none')
    }

    colorLegendToolBar
      .on("mouseover", mouseovercolorLegendToolBarTextRectangle)
      .on("mouseleave", mouseleavecolorLegendToolBarTextRectangle)
  }

  d3
    .select('#colorLegendToolBar')
    .attr('display', 'none')
}

// Legend tool bar Code
{
  legendIcon = svg.append("g")
    .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 6 * helpToolIconCircleSize + helpToolIconBoundaryDistance) + ")")

  advancedOptionsArray.push([legendIcon, 'inline'])

  legendIcon
    .append("circle")
    .attr("r", helpToolIconCircleSize)
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
    d3
      .select('#legendToolBar')
      .raise()
      .attr('display', 'inline')
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

  legendToolBar = svg
    .append('g')
    .attr("transform", "translate(" + (width / 2 - legendToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 6 * helpToolIconCircleSize + helpToolIconBoundaryDistance) + ")")
    .append('svg')
    .attr('id', 'legendToolBar')
    .append('g')

  advancedOptionsArray.push([legendToolBar, 'inline'])

  legendToolBarTextRectangle = legendToolBar
    .append('rect')
    .attr('width', legendToolBarWidth)
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .style('rx', '3px')
    .attr('fill', 'white')
    .attr('font-weight', 300)

  // add text to legend toolbar
  let useMessage = "<a_href=https://en.wikipedia.org/wiki/Betweenness_centrality>Betweenness,</a> or betweenness centrality, is roughly the measure of how central a node is when studying shortest paths. \n \n <a_href=https://en.wikipedia.org/wiki/Degree_(graph_theory)>Degree</a> is the sum of indegree and outdegree. <a_href=https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree>Indegree</a> is the count of all incoming edges. <a_href=https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree>Outdegree</a> is the count of all outgoing edges. \n \n <a_href=https://en.wikipedia.org/wiki/Eigenvector_centrality>Eigencentrality,</a> or eigenvector centrality, is another measure of centrality that takes into account how central are the node's neighbours. It is calculated using the eigenvectors of the adjancency matrix. \n \n <a_href=https://en.wikipedia.org/wiki/PageRank>Pagerank</a> is a variant of eigencentrality developed by Google."

  {
    let words = useMessage.split(" ")
    let text = legendToolBar
      .append("text")
      .text(null)

    let textElements = []
    for (word of words) {
      let textElement = null

      let match = word.match(/<a_href=(.*?)>(.*?)<\/a>/);

      if (match) {
        let link = match[1];
        let word = match[2];
        textElement = {
          "word": word,
          "link": link,
          "islink": true
        }
      }
      else {
        textElement = {
          "word": word,
          "islink": false
        }
      }

      textElements.push(textElement)
    }


    let lines = [] // list of list of tspans

    function getLineLength(ind) {
      ret = 0

      for (let l of lines[ind]) {
        ret += l.node().getComputedTextLength()
        ret += spaceGap
      }
      return ret
    }

    let isNewLine = true
    let currentWords = []

    function packWords() {
      let ret = null
      if (currentWords.length > 0) {

        ret = text
          .append("tspan")
          .text(currentWords.join(" "))

        lines[lines.length - 1].push(ret)
        currentWords = []
      }
      return ret
    }
    for (i = 0; i < textElements.length; ++i) {
      let element = textElements[i]
      let added = null
      if (isNewLine) {
        lines.push([])
        isNewLine = false
      }
      if (element.word == "\n") {
        packWords()

        isNewLine = true
        continue
      }
      else if (element.islink) {
        packWords()

        added = text
          .append('tspan')
        added
          .append('a')
          .attr("xlink:href", element.link)
          .text(element.word)
          .attr('fill', '#007bff')
      }
      else {
        currentWords.push(element.word)
        added = text
          .append("tspan")
          .text(currentWords.join(" "))
      }
      lines[lines.length - 1].push(added)

      if (getLineLength(lines.length - 1) > legendToolBarWidth - 2 * helpToolBarPaddingX) {
        if (element.islink) {
          added.remove()
        }
        else {
          currentWords.pop()
          added.remove()
          lines[lines.length - 1].pop()
          packWords()
        }

        --i

        isNewLine = true
      }
      else {
        if (element.islink);
        else {
          added.remove()
          lines[lines.length - 1].pop()
        }
      }
    }
    packWords()

    lineNumber = 0
    for (line of lines) {
      currentOffset = 0
      for (span of line) {
        span
          .attr("x", helpToolBarPaddingX)
          .attr("y", helpToolBarPaddingY)
          .attr("dy", lineNumber * helpToolBarLineHeight)
          .attr("dx", currentOffset)
        currentOffset += span.node().getComputedTextLength() + spaceGap;
      }
      ++lineNumber
    }

    legendToolBarTextRectangle
      .attr("height", (lineNumber - 1) * helpToolBarLineHeight + 2 * helpToolBarPaddingY)

    var isLegendHovered = false
    function mouseoverlegendToolBarTextRectangle(d) {
      isLegendHovered = true
      d3
        .select('#legendToolBar')
        .raise()
        .attr('display', 'inline')
    }
    function mouseleavelegendToolBarTextRectangle(d) {
      isLegendHovered = false
      d3
        .select('#legendToolBar')
        .attr('display', 'none')
    }

    legendToolBar
      .on("mouseover", mouseoverlegendToolBarTextRectangle)
      .on("mouseleave", mouseleavelegendToolBarTextRectangle)
  }

  d3
    .select('#legendToolBar')
    .attr('display', 'none')
}

{
  // top indegree scoreboard
  let indices = dataNodes.map((_, index) => index);
  const sortedDataNodesIndegree = indices.sort((a, b) => dataNodes[b].in_degree - dataNodes[a].in_degree);

  const topNodes = sortedDataNodesIndegree.slice(0, Math.min(sortedDataNodesIndegree.length, scoreboardNumberOfEntries));

  scoreboardGroup = svg.append("g")
    .attr("class", "scoreboard")
    .attr("transform", "translate(" + (-width / 2 + outlineRadius + scoreboardPadding.left) + ", " + (-height / 2 + outlineRadius + scoreboardPadding.top) + ")")

  advancedOptionsArray.push([scoreboardGroup, 'inline']);

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
      .on("dblclick", function (event) { console.log("here"); clearTimeout(clickTimeout); event.stopPropagation(); })
      .on("click", function (event, datum) {
        clickTimeout = setTimeout(() => {
          if (event.shiftKey) {
            set_dependency(datum);
          } else {
            expandById(datum.id);
            renderList([]);
            searchInput.node().value = "";
          }
        }, 150); // Adjust the timeout duration as needed
        event.stopPropagation();
      })
      .on("dblclick", function (event) {
        clearTimeout(clickTimeout);
        // Your dblclick handler logic here
        event.stopPropagation();
      })

      // disable unnecessary propagation of events to the bottom svg
      .on("mousedown", function (event) { event.stopPropagation(); })
      .on("mouseup", function (event) { event.stopPropagation(); })
      .on("mouseover", function (event) { event.stopPropagation(); })
      .on("mouseout", function (event) { event.stopPropagation(); })
      .on("mousemove", function (event) { event.stopPropagation(); })
      .on("mouseenter", function (event) { event.stopPropagation(); })
      .on("mouseleave", function (event) { event.stopPropagation(); })
      .on("contextmenu", function (event) { event.stopPropagation(); });

    foreignObjectSearchbar
      .attr("height", divSearchbar.node().getBoundingClientRect().height)
  }

  // search bar event listener
  searchInput.on("input", function () {
    const searchText = this.value.toLowerCase();
    if (searchText === "") {
      renderList([]);  // if the search input is empty, clear the list
    } else {
      const filteredData = dataNodes.filter(d => !d.removed && d.name.toLowerCase().includes(searchText)).sort((a, b) => a.name.length - b.name.length);
      renderList(filteredData);
    }
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

  divCollapseAllButton = foreignObjectCollapseAllButton.append('xhtml:div')
    .attr('class', 'button-container')

  collapseAllButton = divCollapseAllButton.append('xhtml:button')
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
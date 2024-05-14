// append the svg object to the body of the page
// appends a 'group' element to 'svg'

var mainDiv = d3.select('body').append('div')

var canvas = mainDiv
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', [-width / 2, -height / 2, width, height]) // set the viewbox so that the origin is in the middle
  .call(
    d3.zoom().on('zoom', function (d) {
      svg.attr('transform', d.transform)
    })
  )

helpToolIcon = canvas.append("g")
  .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + helpToolIconBoundaryDistance) + ")")

legendIcon = canvas.append("g")
  .attr("transform", "translate(" + (width / 2 - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 3 * helpToolIconCircleSize + helpToolIconBoundaryDistance) + ")")

helpToolIcon
  .append("circle")
  .attr("r", helpToolIconCircleSize)
  .attr("cx", 12)
  .attr("cy", 12)
  .attr("fill", "white")
  .attr("opacity", 0)

legendIcon
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

function mouseoverlegendToolIcon(d) {
  d3
    .select('#legendToolBar')
    .raise()
    .attr('display', 'inline')
}
function mouseleavelegendToolIcon(d) {
  if(!isLegendHovered){
    d3
      .select('#legendToolBar')
      .attr('display', 'none')
  }
}

helpToolIcon
  .on("mouseover", mouseoverhelpToolIcon)
  .on("mouseleave", mouseleavehelpToolIcon)

legendIcon
  .on("mouseover", mouseoverlegendToolIcon)
  .on("mouseleave", mouseleavelegendToolIcon)

var svg = canvas
  .append('g')

// create a helpToolBar
var helpToolBar = canvas
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

useMessage = "Click on nodes to expand their neighbours. If a node is darker, it is already expanded or has no neighbours. Click on links to track them. \n \n Use the scroll wheel to zoom in and out. Click and drag to move around."

{
  words = useMessage.split(" ").reverse(),
    line = [],
    lineNumber = 0,

    text = helpToolBar
      .append("text")
      .text(null)

  tspan = text
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

  d3
    .select('#helpToolBar')
    .attr('display', 'none')
}

var legendToolBar = canvas
  .append('g')
  .attr("transform", "translate(" + (width / 2 - legendToolBarWidth - helpToolIconBoundaryDistance) + ", " + (-height / 2 + 3 * helpToolIconBoundaryDistance) + ")")
  .append('svg')
  .attr('id', 'legendToolBar')
  .append('g')

legendToolBarTextRectangle = legendToolBar
  .append('rect')
  .attr('width', legendToolBarWidth)
  .style('stroke', 'black')
  .style('stroke-width', 1)
  .style('rx', '3px')
  .attr('fill', 'white')
  .attr('font-weight', 300)

var isLegendHovered = false
function mouseoverlegendToolBarTextRectangle(d){
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

// add text to legend toolbar
useMessage = "<a_href=https://en.wikipedia.org/wiki/Betweenness_centrality>Betweenness,</a> or betweenness centrality, is roughly the measure of how central a node is when studying shortest paths. \n \n <a_href=https://en.wikipedia.org/wiki/Degree_(graph_theory)>Degree</a> is the sum of indegree and outdegree. <a_href=https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree>Indegree</a> is the count of all incoming edges. <a_href=https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree>Outdegree</a> is the count of all outgoing edges. \n \n <a_href=https://en.wikipedia.org/wiki/Eigenvector_centrality>Eigencentrality,</a> or eigenvector centrality, is another measure of centrality that takes into account how central are the node's neighbours. It is calculated using the eigenvectors of the adjancency matrix. \n \n <a_href=https://en.wikipedia.org/wiki/PageRank>Pagerank</a> is a variant of eigencentrality developed by Google."

{
  words = useMessage.split(" "),
    text = legendToolBar
      .append("text")
      .text(null)

  /*tspan = text
    .append("tspan")
    .attr("x", helpToolBarPaddingX)
    .attr("y", helpToolBarPaddingY)*/


  textElements = []
  for (word of words) {
    let textElement = null

    match = word.match(/<a_href=(.*?)>(.*?)<\/a>/);

    if (match) {
      link = match[1];
      word = match[2];
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


  lines = [] // list of list of tspans

  function getLineLength(ind) {
    ret = 0

    for (let l of lines[ind]) {
      ret += l.node().getComputedTextLength()
      ret += spaceGap
    }
    return ret
  }



  isNewLine = true
  lastIsLink = false
  currentWords = []

  function packWords() {
    ret = null
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
    element = textElements[i]
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
      if (element.islink){
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
    .attr("height", (lineNumber-1) * helpToolBarLineHeight + 2 * helpToolBarPaddingY)

  d3
    .select('#legendToolBar')
    .attr('display', 'none')
}




//var optionsMenu = d3.select("body").append("div").attr('class', 'optionsMenu')
//var inputShowOnlyNecessary = optionsMenu
//  .append('label')
//      .attr('for',function(d,i){ return 'a'+i; })
//      .text('Show only necessary links (recommended when viewing a large number of nodes):')
//  .append("input")
//      .attr("type", "checkbox")
//      .attr("id", function(d,i) { return 'a'+i; })
//      .attr("onClick", "change(this)");
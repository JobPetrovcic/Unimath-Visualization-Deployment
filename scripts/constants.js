const startNodeColor = '#DF2E38'

const codeFont = "'DejaVu Sans Mono', monospace";
const surroundingTextFont = "'Open Sans', sans-serif";

// constants for helpToolIcon and helpToolBar
const helpToolIconBoundaryDistance = 55
const iconCircleSize = 30

const barWidths = 250;
const barHeights = 400;
const barPaddings = 15;
const barRadii = 5;

const helpToolBarPaddingX = 20
const helpToolBarLineHeight = 20
const helpToolBarPaddingY = 30

const legendToolBarWidth = 250
const colorLegendToolBarWidth = 250;
const spaceGap = 3
const startingCaptionFontSize = 10
const wheelScrollSpeed = 30;
const wheelScrollSpeedFast = 120;

const collapseAllButtonWidth = 80;
const collapseAllButtonHeight = 30;

const scoreboardPadding = {left:5, right:5, top:0, bottom:0 }
const scoreboardNumberOfEntries = 5;
const scoreboardLineHeight = 15;
const scoreboardTextHeightRatio = 0.75
const outlineRadius = 3;
const searchbarRadius = 5;
const dividerThickness = 1;

const searchbarWidth = 200;
const searchbarHeight = 100;

// constants for NODES
const nodeRadius = 7
const nodeSize = 2 * nodeRadius
const nodeStrokeWidth = 3;
const nodeCircleColor = '#4682b4';
const nodeTextLengthCap = 34
const nameLengthLimit = 80
const namesOfEntriesXOffset = 10

const nodeLabels = [
  ':sort', 
  ':axiom', 
  ':primitive', 
  ':function', 
  ':record', 
  'constructor', 
  ':data', 
  ':external-module', 
  ':external-library',
]

const colorPalette = {
  ':sort': '#1b9e77',            
  ':axiom': '#e6ab02',           
  ':primitive': '#a6761d',       
  ':function': '#7570b3',        
  ':record': '#a3a3a3',          
  ':constructor': '#d95f02',      
  ':data': '#66a61e',            
  ':external-module': '#e7298a', 
  ':external-library': '#d62728' 
};


const nodePropertiesBasic = {
  name: 'name',
  label: 'label',
  in_degree: 'indegree',
  out_degree: 'outdegree',
}

const nodePropertiesBasicType = { 
  name: 'string',
  label: 'string',
  in_degree: 'int',
  out_degree: 'int',

}

const nodePropertiesAdvanced = {
  betweenness: 'betweenness',
  current_flow_betweenness: 'current flow betweenness',
  n_cycles: 'n-cycles',
  eigen_centrality: 'eigen-centrality',
  pagerank: 'pagerank'
}

const nodePropertiesAdvancedType = {
  betweenness: 'float',
  current_flow_betweenness: 'float',
  n_cycles: 'float',
  eigen_centrality: 'float',
  pagerank: 'float'
}

// constants for LINKS
const linkColor = '#ccc'
const linkColorHighlighted = '#ADB446'
const linkColorTracked = '#B44655'
const linkColorSourceHovered = '#708090'

const linkWidth = '3px'
const linkWidthHighlighted = '7px'
const linkWidthTracked = linkWidthHighlighted
const linkWidthSourceHovered = linkWidthHighlighted

// constants for TOOLTIPS
const tooltipLineDistance = 18 // distance between lines in the tooltip in pixels

const tooltipBoxDistFromNodeX = 10 // the distance from the node and the tooltip box in pixels in the x direction
const tooltipWidth = 250 // tooltip width in pixels
const tooltipPadding = 20
const tooltipOffsetY = 6;

const timeHoveredToTooltip = 1000 // milisecond for which a user must hover over the node to display the node's tooltip

const duration = 550 // duration of expansion of tooltip

const numbersRegexp = new RegExp(/\d+(\.\d+)?/, 'g')
// finds all numbers matching the expression and transforms them to numbers
const getFloatsFromString = string =>
  string.match(numbersRegexp).map(parseFloat)

// constants for POSITION
const minimumGapInLevel = 10
const gapBetweenLevels = 220

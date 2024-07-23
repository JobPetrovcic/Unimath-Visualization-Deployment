var shownNodes = []
var unshowed = []

function unshowNode(v) {
  if (!dataNodes[v].shown && dataNodes[v].removed) return
  dataNodes[v].shown = false
  unshowed.push(v)
  collapse(v);
}

function showNode(v) {
  if (dataNodes[v].shown && !dataNodes[v].removed) return
  dataNodes[v].shown = true
  shownNodes.push(v)
}

function collapse(u) {
  if (!dataNodes[u].expanded) return

  dataNodes[u].expanded = false
  dataNodes[u].children = [];

  // order of bodies of for loops matters
  for (let e = 0; e < neighbours[u].length; ++e) {
    let v = neighbours[u][e]
    // update numberOfExpandedParents
    dataNodes[v].numberOfExpandedParents -= 1
  }
  for (let e = 0; e < neighbours[u].length; ++e) {
    let v = neighbours[u][e]

    if (
      dataNodes[v].numberOfExpandedParents == 0 &&
      dataNodes[v].internalIndegree > 0
    ) {
      unshowNode(v)
    }
  }
}

function expand(u) {
  // check if it is already expanded
  if (dataNodes[u].expanded) return

  dataNodes[u].expanded = true

  dataNodes[u].children = []

  for (let e = 0; e < neighbours[u].length; ++e) {
    // show neighbour and update numberOfExpandedParents
    let v = neighbours[u][e]

    dataNodes[v].numberOfExpandedParents += 1

    if (!dataNodes[v].shown && !dataNodes[v].removed) {
      showNode(v)

      dataNodes[u].children.push(v)

      // set intial position to parent; this will be the spawn position; once the positions are updated, this will be saved as old
      dataNodes[v].x = dataNodes[u].x
      dataNodes[v].y = dataNodes[u].y
    }
  }
}


// get some path from it 
function findSomePath(u) {
  ret = [u]
  while (dataNodes[u].parent && dataNodes[u].parent != -1) {
    u = dataNodes[u].parent
    ret.push(u)
  }
  return ret.reverse();
}

// function to expand a node with specified id (and some necessary parents so that there is a path from the root to it)
function expandById(nodeId) {
  // if it is removed or already shown, return
  if (dataNodes[nodeId].removed) return

  if (dataNodes[nodeId].shown) {

  }
  else {
    let path = findSomePath(nodeId)
    for (let i = 0; i < path.length - 1; ++i) {
      expand(path[i]);
    }
    saveOldPositions();
    arrangeTree();
  }
  svg.transition().duration(duration).call(
    zoom.transform,
    d3.zoomIdentity.scale(1.3).translate(-dataNodes[nodeId].y, -dataNodes[nodeId].x)
  );
  update();
}
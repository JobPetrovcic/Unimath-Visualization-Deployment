var numberOfNodes = dataNodes.length
var shownNodes = []

var rootid;
for (let u = 0; u < numberOfNodes; ++u) if (dataNodes[u].name == rootName) {
  rootid = u;
}
// make library specific connections see librarySpecificSettings.js
for (const item of InitiallyConnect) {
  const [uName, vName] = item;
  for (let u = 0; u < numberOfNodes; ++u) if (dataNodes[u].name == uName) {
    for (let v = 0; v < numberOfNodes; ++v) if (dataNodes[v].name == vName) {
      neighbours[u].push(v)
    }
  }
}

// create dataLinks for d3 to use
var dataLinks = []
// same structure as neighbours only with references to links
var linksReferences = []
var reverselinksReferences = []
for (let u = 0; u < numberOfNodes; ++u) {
  linksReferences.push([])
  reverselinksReferences.push([])
}

for (let u = 0; u < numberOfNodes; ++u) {
  for (let v of neighbours[u]) {
    dataLinks.push({
      source: dataNodes[u],
      target: dataNodes[v],
      offset: (gapBetweenLevels / 2) * Math.random(),
      id: dataNodes[u].id.toString() + '->' + dataNodes[v].id.toString()
    })

    // create a list of references to edges
    linksReferences[u].push(dataLinks[dataLinks.length - 1])
    reverselinksReferences[v].push(dataLinks[dataLinks.length - 1])
  }
}

// establish attributes
for (let i = 0; i < numberOfNodes; ++i) {
  dataNodes[i].internalIndegree = 0
  dataNodes[i].numberOfExpandedParents = 0
  dataNodes[i].children = []

  dataNodes[i].removed = false
  if (InitiallyRemoveNodes.includes(dataNodes[i].name)) {
    remove(i)
  }

  dataNodes[i].shown = false
  dataNodes[i].expanded = false
  dataNodes[i].visited = false
}

// calculate indegrees
for (let u = 0; u < numberOfNodes; ++u) {
  for (let e of linksReferences[u]) {
    e.target.internalIndegree += 1
  }
}

// find roots i. e. nodes without indegrees
roots = []
for (let i = 0; i < numberOfNodes; ++i)
  if (dataNodes[i].internalIndegree == 0) {
    roots.push(i)
  }

// run bfs and find some path from root to every node
// NOTE: some nodes refer to themselves
let queue = [];
for (let r of roots) {
  if (!dataNodes[r].removed){ 
    dataNodes[r].parent = -1;
    queue.push(r);
  }
}

while (queue.length > 0) {
  // dequeue a node from the queue
  let u = queue.shift();

  // visit all adjacent nodes that have not been visited
  for (let v of linksReferences[u]) {
    let neighbor = v.target.id
    if (!dataNodes[neighbor].removed && dataNodes[neighbor].parent == null) {
      dataNodes[neighbor].parent = u;
      queue.push(neighbor);
    }
  }
}

dependsOn = []

function getDependencyOnDFS(u){
  if(dependsOn[u]) return
  dependsOn[u] = true;
  for (let neighborEdge of reverselinksReferences[u]) {
    let v = neighborEdge.source.id
    getDependencyOnDFS(v);
  }
}

//dependents = [];
function getDependencyOn(queryNodeId){
  dependsOn = new Array(dataNodes.length).fill(false);
  getDependencyOnDFS(queryNodeId)

  //dependents = dependsOn.map((value, index) => value ? index : -1).filter(index => index !== -1); 
}
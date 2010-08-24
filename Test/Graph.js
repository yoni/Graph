/*
 * Tests the Graph.js library
 * See README.md for details on the library, how to run tests, etc.
 */
var gph = require('../Graph.js');

var Graph = gph.Graph;
var Vertex = gph.Vertex;
var Edge = gph.Edge;

var graph = gph.graph;
var edge = gph.edge;

/**
 * Expresso runs each test you export.
 */
function test(name, test_function) {
  exports[name] = test_function;
}

test("The null graph", function(assert) {
  var G = new Graph();  
  assert.equal(graph.order(G), 0, "order of G is 0");
  assert.equal(graph.size(G), 0, "size of G is 0");
});

test("Graph, Edge, and Vertex object creation", function(assert) {
  assert.ok( new Graph(), "created a graph" );
  assert.ok( new Edge({},{}), "created an edge" );
  assert.ok( new Vertex(), "created a vertex" );
});

test("Edge construction", function(assert) {
  var v1 = {a:'a'}; // doesn't use the Vertex object explicitly
  var v2 = {b:'b'};
  assert.ok(new Edge(v1, v2), "created an edge" );
  try {
    var e = new Edge();
  } catch(err) {
    assert.ok(err.match("Illegal arguments"), "Expect to not be able to create an edge without two vertices.");
  }
  try {
    var e = new Edge({});
  } catch(err) {
    assert.ok(err.match("Illegal arguments"), "Expect to not be able to create an edge without two vertices.");
  }
});

test("Vertex construction", function(assert) {
  var v1 = new Vertex({a:'a'}); // doesn't use the Vertex object explicitly
  assert.ok(v1.a, "the vertex has all of the same key:value pairs as the arguments to its constructor" );
});

test("Add vertices one at a time", function(assert) {
  var G = new Graph();
  var v1 = new Vertex({name:'kurt', age:27});
  assert.ok(G.addVertex(v1), "added a vertex");
  assert.equal(graph.order(G), 1, "order of G changed to 1");
  var v2 = new Vertex({name:'janis', age:27});
  assert.ok(G.addVertex(v2), "added a vertex");
  assert.equal(graph.order(G), 2, "order of G changed to 2");
});

test("Add a vertex that is not an object", function(assert) {
  var G = new Graph();
  try {
	  G.addVertex();
  } catch(e) {
	  assert.ok(e, "Got exception when trying to create a vertex using no argument.");
  }
  try {
	  G.addVertex(5);
  } catch(e) {
	  assert.ok(e, "Got exception when trying to create a vertex using a number.");
  }
  try {
      G.addVertex('hello');
  } catch(e) {
	  assert.ok(e, "Got exception when trying to create a vertex using a string.");
  }
});

test("Add edges one at a time", function(assert) {
  // set up a graph with two vertices
  var G = new Graph();
  var v1 = new Vertex({name:'kurt', age:27});
  var v2 = new Vertex({name:'janis', age:27});
  G.addVertex(v1);
  G.addVertex(v2);
  
  // add edges and confirm changes in the graph size
  var e1 = new Edge(v1,v2);
  G.addEdge(e1);
  assert.equal(graph.size(G), 1, "size of G changed to 1");
  var e2 = new Edge(v2,v1);
  G.addEdge(e2);
  assert.equal(graph.size(G), 2, "size of G changed to 2");
});

test("Add multiple vertices, duplicates allowed", function(assert) {
  var G = new Graph();
  var v1 = new Vertex({name:'kurt', age:27});
  var v2 = new Vertex({name:'janis', age:27});
  assert.ok(G.addVertices([]), "Add empty set of vertices");
  assert.equal(graph.order(G), 0, "order of G remains 0");
  assert.ok(G.addVertices([v1]), "Add single vertex in array");
  assert.equal(graph.order(G), 1, "order of G changed to 1");
  assert.ok(G.addVertices([v1,v2]), "Add two vertices in array");
  assert.equal(graph.order(G), 3, "order of G changed to 3");
});

test("Add multiple edges, duplicates allowed", function(assert) {
  // set up a graph with two vertices
  var G = new Graph();
  var v1 = new Vertex({name:'kurt', age:27});
  var v2 = new Vertex({name:'janis', age:27});
  G.addVertices([v1,v2]);
  
  var e1 = new Edge(v1,v2);
  var e2 = new Edge(v2,v1);

  assert.ok(G.addEdges([]), "Add empty set of edges");
  assert.equal(graph.size(G), 0, "size of G remains 0");
  G.addEdges([e1]);
  assert.equal(graph.size(G), 1, "size of G changed to 1");
  G.addEdges([e1,e2]);
  assert.equal(graph.size(G), 3, "size of G changed to 3");
});


test("Edge link vs. loop", function(assert) {
  var v1 = {a:'a'};
  var v2 = {b:'b'};
  var v3 = {b:'b'};// not the same edge as v2
  var link1 = new Edge(v1, v2);
  var link2 = new Edge(v2, v3);
  var loop = new Edge(v1, v1);
  assert.ok(edge.isLink(link1), "A link should say it's a link");
  assert.ok(edge.isLink(link2), "A link should say it's a link");
  assert.ok(edge.isLoop(loop), "A loop should say it's a loop");
});

test("Contains edge and anti-edge, i.e. edge exists vs. doesn't exist in the graph", function(assert) {
  var v1 = new Vertex({name:'kurt', age:27});
  var v2 = new Vertex({name:'janis', age:27});
  var e1 = new Edge(v1,v2);
  var e2 = new Edge(v2,v1);

  var G = new Graph();
  G.addVertices([v1,v2]);
  
  // G has no edges  
  assert.ok(!graph.containsEdge(G, e1), "e1 is not an edge");
  assert.ok(graph.isAntiEdge(G, e1), "e1 is an anti-edge");
  
  // G has one edge
  G.addEdges([e1]);
  assert.ok(graph.containsEdge(G, e1), "e1 is an edge");
  assert.ok(!graph.isAntiEdge(G, e1), "e1 is not an anti-edge");
  
  // G has multiple edges
  G.addEdges([e1,e2]);
  assert.ok(graph.containsEdge(G,e1), "e1 is an edge");
  assert.ok(!graph.isAntiEdge(G, e1), "e1 is not an anti-edge");
  assert.ok(graph.containsEdge(G, e2), "e2 is an edge");
  assert.ok(!graph.isAntiEdge(G, e2), "e2 is not an anti-edge");
});

test("Multiplicity", function(assert){
	var G = new Graph();
	var v1 = new Vertex();
	var v2 = new Vertex();
	G.addVertices([v1,v2]);
	var e1 = new Edge(v1,v2);
	var e2 = new Edge(v1,v2);
	var e3 = new Edge(v1,v1);
	
	G.addEdge(e1);
	assert.equal(edge.multiplicity(e1, G), 1, "A single edge has multiplicity 1");
	assert.equal(graph.multiplicity(G), 1, "A graph with a single edge should have multiplicity 1");
	
	G.addEdge(e1); // same edge again
	assert.equal(edge.multiplicity(e1, G), 2, "A single edge with two instances has multiplicity 2");
	assert.equal(graph.multiplicity(G), 2, "Graph multiplicity goes up");
	
	G.addEdge(e2); // different edge with same vertices
	assert.equal(edge.multiplicity(e1, G), 3, "Three of the same gives multiplicity 3.");
	assert.equal(graph.multiplicity(G), 3, "Graph multiplicity goes up");
	
	G.addEdge(e3); // different edge with same vertices
	assert.equal(graph.multiplicity(G), 3, "Graph multiplicity doesn't change");
});

test("Has loops", function(assert){
	var G = new Graph();
	var v1 = new Vertex();
	var v2 = new Vertex();
	assert.ok(!graph.hasLoops(G), "An empty graph has no loops");
	G.addVertices([v1,v2]);
	assert.ok(!graph.hasLoops(G), "A graph with no edges has no loops");
	var e1 = new Edge(v1,v2);
	G.addEdge(e1); // add a link
	assert.ok(!graph.hasLoops(G), "A graph with one link has no loops");
	var e2 = new Edge(v1,v1);
	G.addEdge(e2); // add a loop
	assert.ok(graph.hasLoops(G), "A graph with one loop has loops");
});

test("Simple, Multi, Pseudo", function(assert){
	var G1 = new Graph();
	var v1 = new Vertex();
	var v2 = new Vertex();
	G1.addVertices([v1,v2]);
	var e1 = new Edge(v1,v2);
	var e2 = new Edge(v1,v2);
	var e3 = new Edge(v1,v1);
	
	G1.addEdge(e1);
	assert.ok(!graph.isMulti(G1), "A graph with multiplicity 1 is not Multi");
	assert.ok(graph.isSimple(G1), "A graph with multiplicity 1 and no loops is Simple");
	assert.ok(!graph.isPseudo(G1), "A graph with multiplicity 1 and no loops is not Pseudo");
	
	G1.addEdge(e1); // same edge again
	assert.ok(graph.isMulti(G1), "A graph with multiplicity 2 is Multi");
	assert.ok(!graph.isSimple(G1), "A graph with multiplicity 2 and no loops is not Simple");
	assert.ok(!graph.isPseudo(G1), "A graph with multiplicity 2 and no loops is not Pseudo");
	
	G1.addEdge(e3); // different edge with same vertices
	assert.ok(graph.isMulti(G1), "A graph with multiplicity 2 and a loop is Multi");
	assert.ok(!graph.isSimple(G1), "A graph with multiplicity 2 and a loop is not Simple");
	assert.ok(graph.isPseudo(G1), "A graph with multiplicity 2 and a loops is Pseudo");
	
	var G2 = new Graph();
	G2.addVertices([v1,v2]);
	G2.addEdge(e3);
	assert.ok(!graph.isSimple(G2), "A graph with multiplicity 1 and 1 loop is not Simple");
});

test("Complement", function(assert){
  var G = new Graph();
  var v1 = new Vertex({name:'kurt', age:27});
  var v2 = new Vertex({name:'janis', age:27});
  var e1 = new Edge(v1,v1);
  var e2 = new Edge(v1,v2);
  var e3 = new Edge(v2,v1);
  var e4 = new Edge(v2,v2);
  G.addVertices([v1,v2]);
  
  var C = graph.complement(G);
  assert.ok(graph.containsEdge(C, e1), "e1 should be an edge in complement(G)");
  assert.ok(graph.containsEdge(C, e2), "e2 should be an edge in complement(G)");
  assert.ok(graph.containsEdge(C, e3), "e3 should be an edge in complement(G)");
  assert.ok(graph.containsEdge(C, e4), "e4 should be an edge in complement(G)");
});


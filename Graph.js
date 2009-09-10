/**
 * Graph is a mathematical graph library for javascript. It is designed to be a functional
 * stand-alone library. It is a bare-bones library designed to be light-weight and scalable.
 * 
 * Definitions are taken from the Wikipedia glossary of mathematical graph theory.
 * http://en.wikipedia.org/wiki/Glossary_of_graph_theory
 * 
 * @author yoni ben-meshulam
 */

/**
 * A vertex (basic element) is simply drawn as a node or a dot. The vertex set of G 
 * is usually denoted by V(G), or V when there is no danger of confusion.
 */
Vertex = function(){};

/**
 * An edge (a set of two elements) is drawn as a line connecting two vertices, called 
 * endvertices, or endpoints. An edge with endvertices x and y is denoted by xy 
 * (without any symbol in between). The edge set of G is usually denoted by E(G), or 
 * E when there is no danger of confusion.
 */
Edge = function(v1, v2){
	if((!v1) || (!v2)) {
		throw "Illegal arguments for constructing an Edge. Expected two vertices.";
	}
	this.v1 = v1;
	this.v2 = v2;

	this.directed = false;
	// A loop is an edge whose endvertices are the same vertex.
	this.isLoop = function() {
		if(v1===v2) return true;
		return false;
	};

	// A link has two distinct endvertices.
	this.isLink = function() {
		return !this.isLoop();
	};

	// The multiplicity of an edge is the number of multiple edges sharing the same endvertices
	if(this.directed) {
		// for an undirected edge, it doesn't matter which order the vertices are in
		this.multiplicity = function(G) {
			var m = 0;
			for(var i in G.E) {
				var edge = G.E[i];
				if((edge.v1===this.v1 && edge.v2===this.v2)
				|| (edge.v1===this.v2 && edge.v2===this.v1)) {
					m++;
				}
			}
			return m;
		};
	} else {
		// for a directed edge, the vertices must be in the same order
		this.multiplicity = function(G) {
			var m = 0;
			for(var i in G.E) {
				var edge = G.E[i];
				if(edge.v1===this.v1 && edge.v2===this.v2) {
					m++;
				}
			}
			return m;
		};
	}

	// An edge is multiple if there is another edge with the same endvertices; otherwise it is simple.
	this.isMultiple = function(G) {
		return this.multiplicity(G) > 1;
	};
	this.isSimple = function(e) {
		return this.multiplicity(G) === 1;			
	};
};

/**
 * A graph G consists of two types of elements, namely vertices and edges. Every edge 
 * has two endpoints in the set of vertices, and is said to connect or join the two 
 * endpoints. An edge can thus be defined as a set of two vertices (or an ordered pair, 
 * in the case of a directed graph - see Section Direction).
 * 
 * Uniqueness of vertices and edges is not guaranteed.
 */
Graph = function(){
	this.V = []; // the set of vertices in this graph
	this.E = []; // the set of edges in this graph
	
	this.directed = false;

	// adds the given vertex to the graph
	this.addVertex = function(v) {
		this.V.push(v);
		return true; // success
	};
	// adds the given vertices to the graph
	this.addVertices = function(V) {
		this.V = this.V.concat(V);
		return true; // success
	};
	// adds the given edge to the graph
	this.addEdge = function(e) {
		this.E.push(e);
		return true; // success
	};
	// adds the given edges to the graph
	this.addEdges = function(E) {
		this.E = this.E.concat(E);
		return true; // success
	};
	// The order of a graph is the number of vertices, i.e. |V(G)|.
	this.order = function() {
		return this.V.length;
	};
	// The size of a graph is the number of its edges, i.e. |E(G)|.
	this.size = function() {
		return this.E.length;
	};
	// The multiplicity of a graph is the maximum multiplicity of its edges.
	this.multiplicity = function(){
		var max = 0;
		for (var i in this.E) {
			var eMultiplicity = this.E[i].multiplicity(this);
			if(max < eMultiplicity) max = eMultiplicity;
		}
		return max;
	};
	// a graph has a loop if any of its edges is a loop
	this.hasLoops = function() {
		var E = this.E;
		for (var i in E) {
			if(E[i].isLoop()) return true;
		}
		return false;
	};
	// A graph is a simple graph if it has no multiple edges or loops
	this.isSimple = function() {
		return !(this.hasLoops()||this.isMulti());
	};
	// A graph is a multigraph if it has multiple edges, but no loops
	this.isMulti = function() {
		return this.multiplicity()!=1;
	};
	// A graph is a pseudograph if it contains both multiple edges and loops
	this.isPseudo = function() {
		return this.hasLoops()&&(this.multiplicity()!==1);
	};
};

/**
 * Graph is a mathematical graph library for javascript. It is designed to be a functional
 * stand-alone library. It is a bare-bones library designed to be light-weight and scalable.
 * 
 * Definitions are taken from the Wikipedia glossary of mathematical graph theory. That's a 
 * great place to start to get a basic understanding of abstract graph theory without 
 * the implemetation details.
 *
 * http://en.wikipedia.org/wiki/Glossary_of_graph_theory
 * 
 * Note: In its current form, the library supports only undirected graphs.
 * 
 * @author yoni ben-meshulam
 */
;(function(){
/**
 * A vertex (basic element) is simply drawn as a node or a dot. The vertex set of G 
 * is usually denoted by V(G), or V when there is no danger of confusion.
 */
Vertex = function(obj){
  // a Vertex is nothing more than an object
  // this allows you to extend vertices in any way desirable
  for(var k in obj) {
    this[k]=obj[k];
  }
};
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

  // some functions have different implementations, depending on if the graph is directed
  if(this.directed) {
    // The multiplicity of an edge is the number of multiple edges sharing the same endvertices
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
    // The multiplicity of an edge is the number of multiple edges sharing the same endvertices
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
    if(typeof(v)!='object') throw "A vertex must be an object.";
    this.V.push(v);
    return true; // success
  };
  // adds the given vertices to the graph
  this.addVertices = function(V) {
    for(var i in V) {
      this.addVertex(V[i]);
    }
    return true; // success
  };
  // adds the given edge to the graph
  this.addEdge = function(e) {
    this.E.push(e);
    return true; // success
  };
  // adds the given edges to the graph
  this.addEdges = function(E) {
    for(var i in E) {
      this.addEdge(E[i]);
    }
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
  // An anti-edge is an edge that "is not there". More formally, for two vertices u and v, {u,v} is an anti-edge in a graph G whenever {u,v} is not an edge in G. This means that there is either no edge between the two vertices or (for directed graphs) at most one of (u,v) and (v,u) from v is an arc in G.
  this.isAntiEdge = function(e) {
    return !this.edgeExists(e);
  };

  // some functions have different implementations, depending on if the graph is directed
  if (this.directed) {
    // Returns true if the edge exists in the graph
    this.edgeExists = function(e){
      for (var i in this.E) {
        var edge = this.E[i];
        if (edge.v1 === e.v1 && edge.v2 === e.v2) {
          return true;
        }
        return false;
      }
    };
  } else {
    // Returns true if the edge exists in the graph
    this.edgeExists = function(e){
      for (var i in this.E) {
        var edge = this.E[i];
        if ((edge.v1 === e.v1 && edge.v2 === e.v2) ||
        (edge.v1 === e.v2 && edge.v2 === e.v1)) {
          return true;
        }
      }
      return false;
    };
  }
  //The complement of a graph G is a graph with the same vertex set as G but with an edge set such that xy is an edge in complement(G) if and only if xy is not an edge in G.
  this.complement = function() {
    var C = new Graph();
    C.addVertices(this.V);
    for(var i in this.V) {
      for(var j in this.V) {
        var e = new Edge(this.V[i], this.V[j]);
        if(this.isAntiEdge(e)) {
          C.addEdge(e);
        }
      }
    }
    return C;
  };
};
})();
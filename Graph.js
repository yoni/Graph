/*
 * Mathematical Graph library. For details on how to use please read:
 *    
 *    README.markdown
 * 
 * or go to
 *    
 *    http://github.com/yoni/Grap
 *
 * @author Yoni Ben-Meshulam
 */

/**
 * A vertex (basic element) is simply drawn as a node or a dot. The vertex set of G
 * is usually denoted by V(G), or V when there is no danger of confusion.
 */
function Vertex (obj) {
  // A Vertex is nothing more than an object
  // This allows you to extend vertices in any way desirable
  // Note: we are making a shallow copy of obj, which means that any changes to its member variables 
  // will be reflected in this vertex.
  for (var k in obj) {
    this[k] = obj[k];
  }
}
  
/**
 * An edge (a set of two elements) is drawn as a line connecting two vertices, called
 * endvertices, or endpoints. An edge with endvertices x and y is denoted by xy
 * (without any symbol in between). The edge set of G is usually denoted by E(G), or
 * E when there is no danger of confusion.
 */
function Edge (v1, v2, directed){
  if ((!v1) || (!v2)) {
    throw "Illegal arguments for constructing an Edge. Expected two vertices. Example: <code>var e = new Edge(v1, v2);</code>";
  }
  this.v1 = v1;
  this.v2 = v2;
  this.directed = directed;
}
  
/**
 * A graph G consists of two types of elements: vertices and edges. Every edge
 * has two endpoints in the set of vertices, and is said to connect or join the two
 * endpoints. An edge can thus be defined as a set of two vertices (or an ordered pair,
 * in the case of a directed graph - see Section Direction).
 *
 * Note: The uniqueness of Vertices and Edges is not guaranteed. See multiplicity.
 */
function Graph (){
  this.V = []; // the set of vertices in this graph
  this.E = []; // the set of edges in this graph
  
  /**
   * In a Directed Graph, the order of Vertices in an Edge matters. In an Undirected 
   * Graph, the order
   * A directed arc, or directed edge, is an ordered pair of endvertices that can be represented 
   * graphically as an arrow drawn between the endvertices. In such an ordered pair the first vertex 
   * is called the initial vertex or tail; the second one is called the terminal vertex or head (because 
   * it appears at the arrow head). An undirected edge disregards any sense of direction and treats 
   * both endvertices interchangeably. A loop in a digraph, however, keeps a sense of direction and 
   * treats both head and tail identically. A set of arcs are multiple, or parallel, if they share the 
   * same head and the same tail. A pair of arcs are anti-parallel if one's head/tail is the other's 
   * tail/head. A digraph, or directed graph, or oriented graph, is analogous to an undirected graph 
   * except that it contains only arcs. A mixed graph may contain both directed and undirected edges; 
   * it generalizes both directed and undirected graphs. When stated without any qualification, a graph 
   * is almost always assumed to be undirected.
   * @param toggle
   */ 
  this.directed = function(toggle) {
    if(toggle) {
      _directed = !_directed;
    }
    return _directed;
  };
  var _directed = arguments.directed;// a Graph can be initialized as a directed graph
  
  /**
   * Adds the given vertex to the graph
   * @param {Vertex} v
   */
  this.addVertex = function(v){
    if (typeof(v) != 'object') throw "A vertex must be an object.";
    this.V.push(v);
    return this;
  };
  
  /**
   * 
   * @param {Array of Vertices} V
   */
  this.addVertices = function(V){
    for (var i in V) {
      this.addVertex(V[i]);
    }
    return this;
  };
  
  /**
   * @param {Edge} e
   */
  this.addEdge = function(e){
    if (!e.v1 || !e.v2) throw "Illegal argument. An edge must be incident on two vertices.";
    this.E.push(e);
    return this;
  };
  
  /**
   * @param {Array of Edges} E
   */
  this.addEdges = function(E){
    for (var i in E) {
      this.addEdge(E[i]);
    }
    return this;
  };
  
}

/**
 * A walk is an alternating sequence of vertices and edges, beginning and ending with a vertex, where each vertex 
 * is incident to both the edge that precedes it and the edge that follows it in the sequence, and where the vertices 
 * that precede and follow an edge are the end vertices of that edge.
 * @param {Graph} G
 */
/*
function Walk (G){
    this.E = [];
    if (G.directed) {
      // adds the edge to the walk
      this.addEdge = function(e){
        if (e.v1 !== E[E.length - 1].v2) {
          throw "Illegal edge " + e + ". v1 of the added edge must be equal to v2 of the last edge in the walk.";
        }
        else {
          E.push(e);
        }
      };
      
      //A walk is closed if its first and last vertices are the same, and open if they are different.
      this.closed = function(){
      };
      this.open = function(){
      
      };
    }
    else {
      // adds the edge to the walk
      this.addEdge = function(e){
        if (e.v1 !== E[E.length - 1].v2) {
          throw "Illegal edge " + e + ". v1 of the added edge must be equal to v2 of the last edge in the walk.";
        }
        else {
          E.push(e);
        }
      };
      //A walk is closed if its first and last vertices are the same, and open if they are different.
      this.closed = function(){
        throw "Can't do this yet.";
      };
      this.open = function(){
      
        throw "Can't do this yet.";
      };
    }
  },
  */

/**
 * <p>The functional design of the graph library means that the following functions do not affect the state of their inputs, 
 * they simple produce an output. That is the general contract of functional programming, which differs from
 * the Object-oriented paradigm used above, in describing the stateful Objects we were dealing with.</p>
 * 
 */
var graph = {
  /**
   * The order of a graph is the number of vertices, i.e. |V(G)|.
   * @param {Graph} G
   */
  order:function(G){
    return G.V.length;
  },
  "|V(G)|":function(G){
    return order(G);
  },
  /**
   * The size of a graph is the number of its edges, i.e. |E(G)|.
   * @param {Graph} G
   */
  size:function(G){
    return G.E.length;
  },
  "|E(G)|":function(G){
    return size(G);
  },
  /**
   * The multiplicity of a graph is the maximum multiplicity of its edges.
   * @param {Graph} G
   */
  multiplicity:function(G){
    var max = 0;
    for (var i in G.E) {
      var e = G.E[i];
      var eMultiplicity = edge.multiplicity(e, G);
      if (max < eMultiplicity) max = eMultiplicity;
    }
    return max;
  },
  /**
   * A graph has a loop if any of its edges is a loop
   * @param {Graph} G
   */
  hasLoops:function(G){
    for (var i in G.E) {
      if ( edge.isLoop(G.E[i]) ) return true;
    }
    return false;
  },
  /**
   * A graph is a simple graph if it has no multiple edges or loops
   * @param {Graph} G
   */
  isSimple:function(G){
    return !(graph.hasLoops(G) || graph.isMulti(G));
  },
  /** 
   * A graph is a multigraph if it has multiple edges, but no loops
   * @param {Graph} G
   */
  isMulti:function(G){
    return graph.multiplicity(G) != 1;
  },
  /**
   * A graph is a pseudograph if it contains both multiple edges and loops
   * @param {Graph} G
   */
  isPseudo:function(G){
    return graph.hasLoops(G) && (graph.multiplicity(G) !== 1);
  },
  /**
   * An anti-edge is an edge that "is not there". More formally, for two vertices u and v, {u,v} is 
   * an anti-edge in a graph G whenever {u,v} is not an edge in G. This means that there is either 
   * no edge between the two vertices or (for directed graphs) at most one of (u,v) and (v,u) 
   * from v is an arc in G.
   * @param {Edge} e
   */
  isAntiEdge:function(G,e){
    return !graph.containsEdge(G,e);
  },
  /**
   * @param {Graph} G
   * @param {Edge} e
   */
  containsEdge:function(G, e){
    for (var i in G.E) {
      if ( edge.equal(e, G.E[i]) ) return true;
    }
    return false;
  },
  /**
   * The complement of a graph G is a graph with the same vertex set as G but with an edge set 
   * such that xy is an edge in complement(G) if and only if xy is not an edge in G.
   * @param {Graph} G
   */
  complement:function(G){
    var C = new Graph();
    C.addVertices(G.V);
    for (var i in G.V) {
      for (var j in G.V) {
        var e = new Edge(G.V[i], G.V[j]);
        if ( graph.isAntiEdge(G,e) ) {
          C.addEdge(e);
        }
      }
    }
    return C;
  }
};

var edge = {
  /**
   * A loop is an edge whose end vertices are the same vertex.
   * @param {Edge} e
   */
  isLoop:function(e){
    return (e.v1 === e.v2);
  },
  /**
   * A link has two distinct end vertices.
   * @param {Edge} e
   */
  isLink:function(e){
    return !edge.isLoop(e);
  },
  /**
   * Two edges are equal 
   * @param {Edge} e1
   * @param {Edge} e2
   */
  equal:function(e1, e2){
    // In an undirected edge, the order of vertices does not matter. {v1,v2} is the same as {v2,v1}
    // v1-v2
    if( e1.directed || e2.directed ) {
      return ( e1.v1 === e2.v1 && e1.v2 === e2.v2 );
    }
    // In a directed edge, the order of vertices matters.
    // v1 can be thought of as the head and v2 the tail,
    // v1->v2
    else {
      return ( e1.v1 === e2.v1 && e1.v2 === e2.v2 ) 
         ||( e1.v1 === e2.v2 && e1.v2 === e2.v1 );

    }
  },
  /**
   * The multiplicity of an edge is the number of multiple edges sharing the same endvertices
   * @param {Edge} e
   * @param {Graph} G
   */
  multiplicity:function(e,G){
    var m = 0;
    for (var key in G.E) {
      var e2 = G.E[key];
      if(edge.equal(e2, e)) {
        m++;
      }
    }
    return m;
  },
  /**
   * An edge is multiple if there is another edge with the same endvertices
   * @param {Edge} e
   * @param {Graph} G
   */
  isMultiple:function(e,G){
    return edge.multiplicity(e,G) > 1;
  },
  /**
   * An edge is exactly one edge with the same endvertices
   * 
   * @param {Edge} e
   * @param {Graph} G
   */
  isSimple:function(e,G){
    return edge.multiplicity(e,G) === 1;
  }
}

// Stateful entities
exports.Graph = Graph;
exports.Edge = Edge;
exports.Vertex = Vertex;
// Functional libraries
exports.graph = graph;
exports.edge = edge;



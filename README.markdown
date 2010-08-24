Graph is a mathematical graph library. It is designed to be a functional, stand-alone, light-weight library for general purpose graph processing.
 
Definitions are taken from the Wikipedia glossary of mathematical graph theory. That's a 
great place to start to get a basic understanding of graph theory. The documentation
in this library includes both the Wikipedia definitions and the the implemetation details. 

Author Yoni Ben-Meshulam

See http://en.wikipedia.org/wiki/Glossary_of_graph_theory for a glossary of relevant concepts.

Project: http://github.com/yoni/Graph
 
Use this for anything. See LICENSE for copyright details.

### Object Constructors

The library uses Objects where graph theoretical instances have state.
Namely, the Graph, Vertex, and Edge Objects are of concern in graph theory.
Upper case functions are constructors for Objects which have state. These Objects' internal state
can be modified using lower case functions which are attached to the Objects' prototype.
 
### Functional graph manipulations
Lower case functions are a purely Functional library for manipulating graphs, 
meaning that the functions ALWAYS take inputs and produce outputs (i.e. arguments and return values),
and that they NEVER change the internal state of their input.</p>

## Getting Started

To install using npm:

    npm install Graph

### Example script (see `/examples` for more)
    var g = require('Graph')
    
    var v1 = new Vertex();
    var v2 = new Vertex();

    var e = new Edge(v1, v2);	          // Create an edge, connecting v1 and v2

    var G = new Graph();
    G.addVertices([v1,v2]); 	          // Add an array or vertices t the graph
    G.addEdge(e);				                // Add the edge to the graph

### Add multiple edges to a graph: 

    G.addEdges([e1]);

To create a Vertex, an Edge, or a Graph, use their corresponding constructors, which are upper case functions. These objects are stateful and can be changed using methods like `addVertex` or `isDireced`.

Lower case functions do not change the state of their arguments. They have input and produce output in a purely functional way. For example, to check if an edge is a link or a loop, you can pass it a function which checks for this:

    edge.isLink(e);

### Source repository
To clone with git

    git clone git@github.com:yoni/Graph.git

(function() {
	'use strict';


	// ---------------------------------------------------------------------//
    //                               CONSTANTS                              //
    // ---------------------------------------------------------------------//

 	// ---------------------------------------------------------------------//
    //                               ANIMATION                              //
    // ---------------------------------------------------------------------//

    // ---------------------------------------------------------------------//
    //                               UTILITIES                              //
    // ---------------------------------------------------------------------//

	function getMD(i,j,k,l){
		return Math.abs(i-k)+Math.abs(j-l);
	}

	function isSafe(candidate, optionsTOS, n){
		var i=(candidate-1)/n+1, 
			j=(candidate-1)%n+1, 
			k=(optionTOS-1)/n+1, 
			l=(optionTOS-1)%n+1;
		return getMD(i,j,k,l)!=3 && i!=k && j!=l;
	}

	function isPuzzleMove(x, puzzleMoves){
		return puzzleMoves.includes(x);
	}

	function init(){

	}

	function solveNChans(){

	}
	
	//test
	var cfg = {
		draggable: true,
    	dropOffBoard: 'trash',
    	sparePieces: true,
    	showNotation: false,
    	onChange: function(oldPos, newPos) {
	    	document.getElementById("fen").innerHTML = ChessBoard3.objToFen(newPos);
	    }
   	};
	var board1 = new ChessBoard3('board', cfg);


	// ---------------------------------------------------------------------//
    //                           WIDGET DEFINITION                          //
    // ---------------------------------------------------------------------//


}) ();

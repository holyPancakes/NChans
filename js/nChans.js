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

	function fenToConfig (fen) {
		if (!fen) {
			alert('Invalid input');
			return;
		}

		let config = '';
		for (let i=0, x=0; i<fen.length; i++) {
			switch (fen[i]) {
				case 'K':
					config += '1 ';
					break;
				case '/':
					config += '\n';
					break;
				default:
					let m = parseInt(fen[i]);
					for (;m>0;m--) {
						config += '0 '
					}
					break;
			}
		}

		return config;
	}

	function configToFen (config) {
		if (!config) {
			alert('Invalid input');
			return;
		}

		let fen = '';
		let stack = [];

		for (let i=0; i<config.length; i++) {
			switch (config[i]) {
				case '1':
					if (stack.length > 0) {
						fen += stack.length;
						stack = [];
					}
					fen += 'K';
					break;
				case '0':
					stack.push(0);
					break;
				case '\n':
					if (stack.length > 0) fen += stack.length;
					stack = [];
					fen += '/';
					break;
				default: // whitespace
					break;
			}
		}

		if (stack.length > 0) fen += stack.length;

		return fen;
	}

	function solveNChans (N, config, initialPlaced) {

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

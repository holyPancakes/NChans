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
        return parseInt(Math.abs(i-k)+Math.abs(j-l));
    }

    function isSafe(candidate, optionTOS, n){
        var i=parseInt((candidate-1)/n+1), 
            j=parseInt((candidate-1)%n+1), 
            k=parseInt((optionTOS-1)/n+1), 
            l=parseInt((optionTOS-1)%n+1);
            console.log(getMD(i,j,k,l));
        return (getMD(i,j,k,l)!=3 && i!=k && j!=l);
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

    function solveNChans (N, config) {
        let tempNumOfMoves = 0, n = N;
        let candidate;
        let puzzles = [];
        let solutions = [];

        let j = 0, i = 0;
        for (i=0;i<(n*n);i++) {
            puzzles[i] = 0;
        }

        for (i=0,j=0;i<(n*n);i+=2,j++) {
            let c = config[i]; console.log(c);
            if (c == "1") puzzles[tempNumOfMoves++] = j + 1;
        }

        let nopts = [];
        for (i=0;i<(n*n);i++) {
            nopts[i] = 0;
        }

        let option = [];
        for (i=0;i<(n+2);i++) {
            let arr = [];
            for (j=0;j<(n+2);j++) {
                arr[j] = 0;
            }

            option.push(arr);
        }

        console.log(option);


        move = start = 0;
        nopts[start] = 1;

        while (nopts[start] > 0) {
            if(nopts[move]>0) {
                move++;
                nopts[move]=0; //initialize new move
                if(move == 1) {
                    for(candidate = n*n; candidate >=1; candidate --) {
                        for(j=0;j<tempNumOfMoves;j++){
                            if(!isSafe(candidate, puzzles[j], n)){
                                break;
                            }
                        }

                        if(!(j<tempNumOfMoves)){
                            nopts[move]++;
                            option[move][nopts[move]] = candidate;
                        }
                    }
                }
                else{
                    //consider n down to 1 as valid candidates
                    for(candidate=n*n;candidate>=1;candidate--) {
                        for(i=move-1;i>=1;i--)//check for duplicates
                            if(candidate==option[i][nopts[i]]) 
                                break;
                            
                        if(!(i>=1) && candidate > option[move-1][nopts[move-1]] ){//no duplicates found
                            for(i=move-1; i>=1; i--)//check if candidate is a safe move
                                if(!isSafe(candidate, option[i][nopts[i]], n))
                                    break;

                            if(!(i>=1)){
                                for(j=0;j<tempNumOfMoves;j++){
                                    if(!isSafe(candidate, puzzles[j], n)){
                                        break;
                                    }
                                }

                                if(!(j<tempNumOfMoves)){
                                    option[move][++nopts[move]] = candidate;
                                }

                                
                            }
              
                        }
                    }
                }
            }
            else {
                //solution found when nopts[move] is 0 and move == n+1
                if(move==n-1){
                    // printf("\nSOLUTION %d:\n", ++numOfSolutions);
                    // fprintf(out, "\nSOLUTION %d:\n", numOfSolutions);
                    let k=1, l=0;
                    let sol = "";
                    for(i=1;i<=n*n;i++){
                        if(i==option[k][nopts[k]]){
                            // printf("C ");
                            // fprintf(out, "1 ");
                            sol += '1 ';
                            k++;
                        }
                        else if(i==puzzles[l]){
                            // printf("C ");
                            // fprintf(out, "1 ");
                            sol += '1 ';
                            l++;
                        }
                        else{
                            // printf("_ ");
                            // fprintf(out, "0 ");
                            sol += '0 ';
                        }
                        if(i%n==0){
                            // printf("\n");
                            // fprintf(out, "\n");
                            sol += '\n';
                        }
                    }
                    solutions.push(sol);

                    console.log(solutions.length);
                    console.log(sol);
                }
                
                move--;
                nopts[move]--;
            }
        }

        //return solutions;
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

'use strict';

function getMD(i,j,k,l){
    return parseInt(Math.abs(i-k)+Math.abs(j-l));
}

function isSafe(candidate, optionTOS, n){
    var i=parseInt((candidate-1)/n+1), 
        j=parseInt((candidate-1)%n+1), 
        k=parseInt((optionTOS-1)/n+1), 
        l=parseInt((optionTOS-1)%n+1);
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
    let numOfPuzzleMoves = 0, n = N;
    let puzzleMoves = [];
    let candidate;
    let solutions = [];
    let nopts = [];
    let option = [];
    let start, move;


    let j = 0, i = 0;
    for (i=0;i<(n*n);i++) {
        puzzleMoves[i] = 0;
    }

    for (i=0;i<(n*n);i++) {
        let c = config[i*2];
        if (c == "1") {
            puzzleMoves[numOfPuzzleMoves++] = i+1;
        }
    }
    console.log(puzzleMoves.toString())

    
    for (i=0;i<(n*n);i++) {
        nopts[i] = 0;
    }

    
    for (i=0;i<(n+2);i++) {
        let arr = [];
        for (j=0;j<(n+2);j++) {
            arr[j] = 0;
        }
        option[i]=arr;
    }


    move = start = 0;
    nopts[start] = 1;

    while (nopts[start] > 0) {
        if(nopts[move]>0) {
            move++;
            nopts[move]=0; //initialize new move
            if(move == 1) {
                for(candidate = n*n; candidate >=1; candidate --) {
                    for(j=0;j<numOfPuzzleMoves;j++){
                        if(!isSafe(candidate, puzzleMoves[j], n)){
                            break;
                        }
                    }

                    if(!(j<numOfPuzzleMoves) || isPuzzleMove(candidate, puzzleMoves, numOfPuzzleMoves)){
                        option[move][++nopts[move]] = candidate;
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
                            for(j=0;j<numOfPuzzleMoves;j++){
                                if(!isSafe(candidate, puzzleMoves[j], n)){
                                    break;
                                }
                            }

                            if(!(j<numOfPuzzleMoves) || numOfPuzzleMoves==0 || isPuzzleMove(candidate, puzzleMoves, numOfPuzzleMoves)){
                                option[move][++nopts[move]] = candidate;
                            }

                            
                        }
          
                    }
                }
            }
        }
        else {
            //solution found when nopts[move] is 0 and move == n+1
            if(move-1==n){
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
                    else if(i==puzzleMoves[l]){
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
                        sol = sol.slice(0,-1);
                        sol += '\n';
                    }
                }
                solutions.push(sol);
                console.log(sol);
            }
            
            move--;
            nopts[move]--;
        }
    }

    return solutions;
}

(function() {

    var puzzles = [];
    var currentPuzzle = 0;


    //test
    var cfg = {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        showNotation: false,
        localStorage: false,
        backgroundColor: 0xffffff,
        whitePieceColor: 0xb28613,
        onChange: function(oldPos,newPos){
            console.log(ChessBoard3.objToFen(newPos));
            document.getElementById("changeFEN").value = ChessBoard3.objToFen(newPos);
        }
    };
    var board1 = new ChessBoard3('board', cfg, 7);

    function addPuzzle(){

    }

    //TEST ON ANIMATING MOVES
    $("#changeFEN").keydown(function(event){
        if(event.keyCode == 13){
            var source = event.target || event.srcElement;
            board1.position(source.value,true);
        }
    });

}) ();

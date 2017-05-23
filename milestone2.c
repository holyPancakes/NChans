int main() {
    FILE *out = fopen("output.txt", "w+");
    FILE *in = fopen("input.txt", "r+");

	int start, move;
	int *nopts; //array of top of stacks
	int **option; //array of stacks of options
	int n , c, i, j, k, l, candidate, numOfSolutions;
    int solutionFound = 0;
    int numOfPuzzles = 0;
    int *puzzleMoves;
    int temp, numOfPuzzleMoves=0;

    /*Read input.txt*/
    fscanf(in,"%d\n", &numOfPuzzles);

    for(c=0;c<numOfPuzzles;c++){
    	printf( "\nPUZZLE #%d\n", c+1);
    	fprintf(out, "\nPUZZLE #%d\n", c+1);
        numOfSolutions=0;
    	solutionFound = 0;
    	numOfPuzzleMoves = 0;
    	fscanf(in, "%d\n", &n);
    	puzzleMoves = (int*)  malloc(sizeof(int)*(n*n));
    	for(j=0; j<n*n; j++){
    		puzzleMoves[j] = 0;
    	}
    	for(j=0; j<n*n; j++){
    		fscanf(in, "%d", &temp);
    		fgetc(in);

    		if(temp==1){
    			puzzleMoves[numOfPuzzleMoves++] = j+1;
    		}
      	}

    	nopts = (int*) malloc(sizeof(int)*(n+2));
    	option = (int**) malloc(sizeof(int*)*(n*n+2));
		for(j=0;j<(n+2);j++){
			option[j] = (int*) malloc(sizeof(int)*(n*n+2));
		}


		move = start = 0;
		nopts[start]= 1;
		while (nopts[start] >0) {//while dummy stack is not empty
            if(nopts[move]>0) {
				move++;
				nopts[move]=0; //initialize new move
				if(move == 1) {
		            for(candidate = n*n; candidate >=1; candidate--) {
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

		                if(!(i>=1) && candidate > option[move-1][nopts[move-1]] ){//no duplicates found and not another Permutation
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
		            //printf("NEXT STACK\n");
				}
			}
			else {
				//solution found when nopts[move] is 0 and move == n+1
                if(move-1==n){
		        	printf("SOLUTION %d:\n", ++numOfSolutions);
		            fprintf(out, "SOLUTION %d:\n", numOfSolutions);
		        	k=1;l=0;
		        	for(i=1;i<=n*n;i++){
		        		if(i==option[k][nopts[k]]){
		        			printf("C ");
		                    fprintf(out, "1 ");
		        			k++;
		        		}
		        		else{
		        			printf("_ ");
		                    fprintf(out, "0 ");
		        		}
		        		if(i%n==0){
		        			printf("\n");
		                    fprintf(out, "\n");
		        		}
		        	}
		        }

				move--;
				nopts[move]--;
			}
            printStacks(option, nopts, move);
		}
		/*************************************/
		if(numOfSolutions == 0) {
		    printf("No solution\n");
		    fprintf(out, "No solution\n");
    	}
    	//free(puzzleMoves); puzzleMoves = NULL;
    	//free(nopts); nopts = NULL;
    	//free(option); option = NULL;
	}




    fclose(out);
    fclose(in);

}
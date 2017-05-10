//Code Edited By: Maru Gabriel S. Baul 2013-01453
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>

int getMD(int i, int j,int k,int l){
    return (abs(i-k)+abs(j-l));
}

int isSafe(int candidate, int optionTOS, int n){
	int i=(candidate-1)/n+1, j=(candidate-1)%n+1, k=(optionTOS-1)/n+1, l=(optionTOS-1)%n+1;
	printf("candidate:%d(%d,%d) optionTOS:%d(%d,%d)", candidate, i,j ,optionTOS, k, l);
	if( getMD(i,j,k,l)!=3 && i!=k && j!=l  ){//safe
		printf(" safe\n");
		return 1;
	}
	else{//not safe
		printf(" not safe\n");
		return 0;
	}
}

int main() {
    FILE *out = fopen("output.txt", "w+");
    FILE *in = fopen("input.txt", "r+");
	
	int start, move;
	int *nopts; //array of top of stacks
	int **option; //array of stacks of options
	int n , c, i, j, k, l, candidate, numOfSolutions = 0;
    int solutionFound = 0;
    int numOfPuzzles = 0;
    int *puzzles;
    int temp, tempNumofMoves=0;

    /*Read input.txt*/
    fscanf(in,"%d\n", &numOfPuzzles);

    for(c=0;c<numOfPuzzles;c++){
    	printf( "\nPUZZLE #%d\n", c+1);	
    	fprintf(out, "\nPUZZLE #%d\n", c+1);
    	solutionFound = 0;
    	tempNumofMoves = 0;
    	fscanf(in, "%d\n", &n);
    	puzzles = (int*)  malloc(sizeof(int)*(n*n));
    	for(j=0; j<(n*n); j++){
    		puzzles[j] = 0;
    	}
    	for(j=0; j<n*n; j++){
    		fscanf(in, "%d", &temp);
    		fgetc(in);

    		if(temp==1){
    			puzzles[tempNumofMoves++] = j+1;
    		}
      	}

    	nopts = (int*) malloc(sizeof(int)*(n*n));
    	option = (int**) malloc(sizeof(int)*(n+2));
		for(j=0;j<(n+2);j++){
			option[j] = (int*) malloc(sizeof(int)*(n+2));
		}    	


		move = start = 0;
		nopts[start]= 1;
		while (nopts[start] >0) {//while dummy stack is not empty
			if(nopts[move]>0) {
				move++;
				nopts[move]=0; //initialize new move
				if(move == 1) {
		            for(candidate = n*n; candidate >=1; candidate --) {
						for(j=0;j<tempNumofMoves;j++){
							if(!isSafe(candidate, puzzles[j], n)){
								break;
							}
						}

						if(!(j<tempNumofMoves)){
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
		                   		for(j=0;j<tempNumofMoves;j++){
									if(!isSafe(candidate, puzzles[j], n)){
										break;
									}
								}

								if(!(j<tempNumofMoves)){
									option[move][++nopts[move]] = candidate;
									printf("safe=%d\n", candidate);
								}

		                   		
		                  	}
		      
		        		}
		            }
		            printf("NEXT STACK\n");
				}
			}
			else {
				//solution found when nopts[move] is 0 and move == n+1
		        if(move==n-1){
		        	printf("\nSOLUTION %d:\n", ++numOfSolutions);
		            fprintf(out, "\nSOLUTION %d:\n", numOfSolutions);
		            solutionFound = 1;
		        	k=1;l=0;
		        	for(i=1;i<=n*n;i++){
		        		if(i==option[k][nopts[k]]){
		        			printf("C ");
		                    fprintf(out, "1 ");
		        			k++;
		        		}
		        		else if(i==puzzles[l]){
		        			printf("C ");
		                    fprintf(out, "1 ");
		        			l++;
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
		}
		/*************************************/
		if(solutionFound == 0) {
		    printf("No solution\n");
		    fprintf(out, "No solution\n");
    	}
    	//free(puzzles); puzzles = NULL;
    	//free(nopts); nopts = NULL;
    	//free(option); option = NULL;
	}


   

    fclose(out);
    fclose(in);
    
}

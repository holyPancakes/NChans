//Code Edited By: Maru Gabriel S. Baul 2013-01453
#include <stdio.h>
#include <stdlib.h>
#define N 4
#define DIM (N+2)*(N+2)

int getMD(int i, int j,int k,int l){
    return (abs(i-k)+abs(j-l));
}

int isSafe(int candidate, int optionTOS){
	int i=(candidate-1)/N+1, j=(candidate-1)%N+1, k=(optionTOS-1)/N+1, l=(optionTOS-1)%N+1;
	
	if( getMD(i,j,k,l)!=3 && i!=k && j!=l  ){//safe
		return 1;
	}
	else{//not safe
		return 0;
	}
}

int main() {
    FILE *fp = fopen("output.txt", "w+");
	int start, move;
	int nopts[DIM]; //array of top of stacks
	int option[DIM][DIM]; //array of stacks of options
	int i, j, k, candidate, numOfSolutions = 0;
    int solutionFound = 0;
    
	move = start = 0;
	nopts[start]= 1;
	while (nopts[start] >0) {//while dummy stack is not empty
		if(nopts[move]>0) {
			move++;
			nopts[move]=0; //initialize new move
			if(move == 1) {
                for(candidate = N*N; candidate >=1; candidate --) {
					nopts[move]++;
					option[move][nopts[move]] = candidate;
				}
			}
			else{
				//consider N down to 1 as valid candidates
                for(candidate=N*N;candidate>=1;candidate--) {
                    for(i=move-1;i>=1;i--)//check for duplicates
                        if(candidate==option[i][nopts[i]]) 
                            break;
                        
                    if(!(i>=1) && candidate > option[move-1][nopts[move-1]] ){//no duplicates found
                       	for(i=move-1; i>=1; i--)//check if candidate is a safe move
                       		if(!isSafe(candidate, option[i][nopts[i]]))
                       			break;

                       	if(!(i>=1)){
                       		option[move][++nopts[move]] = candidate;
                      	}
          
            		}
                }
			}
		}
		else {
			//solution found when nopts[move] is 0 and move == N+1
            
            if(move==N+1){
            	printf("\nSOLUTION %d:\n", ++numOfSolutions);
                fprintf(fp, "\nSOLUTION %d:\n", numOfSolutions);
                solutionFound = 1;
            	k=1;
            	for(i=1;i<=N*N;i++){
            		if(i==option[k][nopts[k]]){
            			printf("C ");
                        fprintf(fp, "1 ");
            			k++;
            		}
            		else{
            			printf("_ ");
                        fprintf(fp, "0 ");
            		}
            		if(i%N==0){
            			printf("\n");
                        fprintf(fp, "\n");
            		}
            	}
            	
            }
            
			move--;
			nopts[move]--;
		}
	}

    if(solutionFound == 0) {
        printf("No solution");
        fprintf(fp, "No solution");
    }

    fclose(fp);
}

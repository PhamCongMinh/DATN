export const cppCode = `
#include <iostream>
using namespace std;
int greet(int a,int b) {
    return a + b;
}
int main() {
    int a,b;
    cin >> a >> b;
    cout << greet(a,b);
    return 0;
}`;

export const cppCode2 = `
#include <iostream>
using namespace std;
int greet(int a,int b) {
    return a + b;
}
int main(int argc, char* argv[]) {
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);
    cout << greet(a,b);
    return 0;
}`;

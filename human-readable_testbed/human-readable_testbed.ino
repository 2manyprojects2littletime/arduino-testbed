typedef int (*testFunction)();

const int numberOfTests = 1;

testFunction tests[numberOfTests];

int smokeTest() {
  pinMode(12, OUTPUT);
  digitalWrite(12, HIGH);
  delay(500);
  digitalWrite(12, LOW);
  delay(500);
  pinMode(12, INPUT);
  delay(500);
  return 0;
}

void setup () {
  return;
}

void registerTests() {
  tests[0] = &smokeTest;
}

int main() {
  static int testResults[numberOfTests];
  setup();
  registerTests();
  for (int i = sizeof(tests); i > 0; i--) {
    testResults[i] = tests[i]();
  }
  return testResults[0];
}

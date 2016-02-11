var ledOn = false;
function toggleLed() {
  digitalWrite(4,ledOn);
  ledOn = !ledOn;
}
setWatch(function () {
  console.log("Pressed!!!");
  toggleLed();
}, "D5", { repeat:true, edge:'rising', debounce : 50 });
pinMode(D0,"input_pullup");
digitalWrite(D4,0);
pinMode(D12,"input_pullup");
pinMode(D13,"input_pullup");
pinMode(D14,"input_pullup");
pinMode(D15,"input_pullup");
"use strict"

var song
var fft
var button
var buttonS
var buttonD
var sounds = []
var count
var colour

var debugMode = false

function preload() {

   for (var i = 1; i < 6; i++) {
      sounds[i] = loadSound("assets/" + i + ".mp3")
      count = i.toString()
   }
   song = sounds[randomiser()]
}

function toggleSong() {
   if (!song.isPlaying()) {
      song.play()
      button.html("PAUSE")
   } else {
      song.pause()
      button.html("PLAY")
   }
}

function debugModeF() {
   if (!debugMode){
      debugMode = true
      buttonD.html("DEBUG MODE ON")
   } else {
      debugMode = false
      buttonD.html("DEBUG MODE OFF")
   }
   
}

function setup() {
   createCanvas(600, 600)

   colorMode(HSL)
   background(255)
   noStroke()

   button = createButton('PAUSE')
   button.class("pause")
   button.mousePressed(toggleSong)

   buttonS = createButton('SAVE')
   buttonS.class("save")
   buttonS.mousePressed(savePic)
   
   buttonD = createButton('DEBUG MODE OFF')
   buttonD.class("dm")
   buttonD.mouseClicked(debugModeF)

   fft = new p5.FFT(0, 256)
   song.play()
}

function savePic() {
   saveCanvas(count, 'jpg')
}

function draw() {
   var spectrum = fft.analyze()


   push()
   translate(width / 2, height / 2)
   //var angle = radians(180)
   rotate(frameCount / 100) //angle //you can also try to add ((angle+frameCount) * 0.01)

   var freq, amp, sinVal
   var distance

   for (var i = 0; i < spectrum.length; i++) {
      freq = frameCount * 0.01
      var amp = spectrum[i]
      var r = map(amp, 0, 256, 10, 256)
      sinVal = noise(r) * r

      freq = frameCount * 0.015
      r = map(amp, 0, 256, 10, 256)
      distance = sin(r) * r
      
      colour = map(r, 10, 200, 0, 360)

      if (debugMode) {
         stroke(0, 0, 0.1)
      } else {
        stroke(colour, 100, 50, 0.1)
      }
      
      strokeWeight(0.5)
      //point(r,r)
      line(0, 0, r, 0)
      //line(0, 0, distance, 0)
   }
   pop()
}

function randomiser() {
   var rando = floor(random(1, 6))
   return 5
}

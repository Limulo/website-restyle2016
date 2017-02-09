https://www.adafruit.com/products/1734

[WS2812](https://cdn-shop.adafruit.com/datasheets/WS2812.pdf)
[SK6812](https://cdn-shop.adafruit.com/product-files/1138/SK6812+LED+datasheet+.pdf)
[NeoPixel Uberguide](https://learn.adafruit.com/adafruit-neopixel-uberguide/overview)

This NeoPixel RGB LED draw a maximum current og **60 mA** at full brigtness so it is possible for the LED to be powered directly from the Arduino 5V line since the Arduino can continuously supply only about 500 milliamps to the 5V pin.

It is better to place a **0.1uF** capacitor between power and gnd directly in front of each LED.

It si better to place a **470 Ohm** (any 300 to 500 Ohm resistor will do) resistor to the data line.

* minimize the distance between the Arduino and first pixel

![image](https://learn.adafruit.com/assets/31478)

* 

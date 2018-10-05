#!/usr/bin/python

import grove_gesture_sensor
import time
import serial
import subprocess
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)

subprocess.call('i2cdetect -y 1', shell=True)

#s = serial.Serial('/dev/ttyUSB1', 115200, timeout=1)
g=grove_gesture_sensor.gesture()
g.init()

count = 0

try:
	while True:
		gest=g.return_gesture()

		if gest==g.UP:
#			s.write("w")
			GPIO.output(23, False)	# 00
			GPIO.output(24, False)
			count = count + 1
#			print("UP")

		elif gest==g.DOWN:
#			s.write("s")
			GPIO.output(23, False)	# 01
			GPIO.output(24, True )
			count = count + 1
#			print("DOWN")

		elif gest==g.LEFT:
#			s.write("a")
			GPIO.output(23, True )	# 10
			GPIO.output(24, False)
			count = count + 1
#			print("LEFT")

		elif gest==g.RIGHT:
#			s.write("d")
			GPIO.output(23, True )	# 11
			GPIO.output(24, True )
			count = count + 1
#			print("RIGHT")

		else:
			time.sleep(.01)
		
		if count == 10000:
			count = 0
		
		if count % 2 == 0:
			GPIO.output(18, False)	# 1	- to make event by gesture
									#	  ( up, down, left, right )
		else:
			GPIO.output(18, True )	# 0	- to make event by gesture
									#	  ( up, down, left, right )
		time.sleep(.01)
		
except KeyboardInterrupt:
    GPIO.cleanup()

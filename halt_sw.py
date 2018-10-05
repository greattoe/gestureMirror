#!/usr/bin/python

import RPi.GPIO as GPIO
import time
import os

# Use the Broadcom SOC Pin numbers  
# Setup the Pin with Internal pullups enabled and PIN in reading mode.  
GPIO.setmode(GPIO.BCM)  
GPIO.setup(21, GPIO.IN, pull_up_down = GPIO.PUD_UP)  

# Do next
try:
	print "SW for shutdown is enabled."
	# Our function on what to do when the button is pressed  
	def shutdown(channel):  
		os.system("sudo shutdown -h now")  
 
	# Add our function to execute when the button pressed event happens  
	GPIO.add_event_detect(21, GPIO.FALLING, callback = shutdown, bouncetime = 1000)  
 
	# Now wait!  
	while 1:  
		time.sleep(1)

# when K/B interrupt occured
except KeyboardInterrupt:
	print "SW for shutdown is disabled."
	GPIO.cleanup()
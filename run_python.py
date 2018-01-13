""" A sample python script for testing """
import RPi.GPIO as GPIO
import time
import sys


def run():
    """ Run """
    print "R"
    for i in range(0, 5):
        print str(i) + " Kujus"
        time.sleep(1)

run()

""" A sample python script for testing """
import RPi.GPIO as GPIO
import time


def run():
    """ Run """
    print "R"
    for i in range(0, 100):
        print str(i) + " Kujus"
        time.sleep(1)


run()

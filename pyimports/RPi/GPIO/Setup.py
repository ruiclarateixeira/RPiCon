""" Setup Fns """
import json
from RPi.GPIO.TCPHandler import TCPHandler

# State
PINS = {}

# Pin modes
BOARD = 1
BCM = 2

# Directions
IN = 1
OUT = 2

# Debug connectivity
HANDLER = TCPHandler('', 3001)


def cleanup():
    """ Clean up any existing pin setup """
    PINS.clear()
    sendupdate()


def setmode(mode):
    """ Set board mode """
    print "[GPIODEBUG] MODE " + str(mode)
    sendupdate()


def setup(channel, direction):
    PINS[channel] = {
        "direction": direction
    }
    sendupdate()


def getpins():
    return PINS


def sendupdate():
    HANDLER.send(json.dumps(PINS))

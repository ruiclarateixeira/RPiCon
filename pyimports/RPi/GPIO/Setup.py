""" Setup Fns """
import json
from RPi.GPIO.TCPHandler import TCPHandler
from RPi.GPIO.Layouts import BOARD_LAYOUT

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


def setmode(mode):
    """ Set board mode """
    print "[GPIODEBUG] MODE " + str(mode)

    if mode == BOARD:
        PINS.update(BOARD_LAYOUT)
        sendupdate()
    else:
        raise Exception("Mode {} is not supported".format(mode))


def setup(channel, direction):
    PINS[str(channel)]["direction"] = direction
    sendupdate()


def getpins():
    return PINS


def sendupdate():
    HANDLER.send(json.dumps(PINS))

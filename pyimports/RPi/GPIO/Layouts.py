""" Board layout constants
Source: https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/
"""

TYPE_POWER = "power"
TYPE_GPIO = "GPIO"
TYPE_GROUND = "ground"
BOARD_LAYOUT = {
    "1": {
        "name": "3V3",
        "type": TYPE_POWER
    },
    "2": {
        "name": "5V",
        "type": TYPE_POWER
    },
    "3": {
        "name": "GPIO2",
        "type": TYPE_GPIO
    },
    "4": {
        "name": "5V",
        "type": TYPE_POWER
    },
    "5": {
        "name": "GPIO3",
        "type": TYPE_POWER
    },
    "6": {
        "name": "Ground",
        "type": TYPE_GROUND
    },
    "7": {
        "name": "GPIO4",
        "type": TYPE_GPIO
    },
    "8": {
        "name": "GPIO14",
        "type": TYPE_GPIO
    },
    "9": {
        "name": "Ground",
        "type": TYPE_GROUND
    },
    "10": {
        "name": "GPIO15",
        "type": TYPE_GPIO
    },
    "11": {
        "name": "GPIO17",
        "type": TYPE_GPIO
    },
    "12": {
        "name": "GPIO18",
        "type": TYPE_GPIO
    },
    "13": {
        "name": "GPIO27",
        "type": TYPE_GPIO
    },
    "14": {
        "name": "Ground",
        "type": TYPE_GROUND
    },
    "15": {
        "name": "GPIO22",
        "type": TYPE_GPIO
    },
    "16": {
        "name": "GPIO23",
        "type": TYPE_GPIO
    },
    "17": {
        "name": "3V3",
        "type": TYPE_POWER
    },
    "18": {
        "name": "GPIO24",
        "type": TYPE_GPIO
    },
    "19": {
        "name": "GPIO10",
        "type": TYPE_GPIO
    },
    "20": {
        "name": "Ground",
        "type": TYPE_GROUND
    },
    "21": {
        "name": "GPIO9",
        "type": TYPE_GPIO
    },
    "22": {
        "name": "GPIO25",
        "type": TYPE_GPIO
    },
    "23": {
        "name": "GPIO11",
        "type": TYPE_GPIO
    },
    "24": {
        "name": "GPIO8",
        "type": TYPE_GPIO
    },
    "25": {
        "name": "ground",
        "type": TYPE_GROUND
    },
    "26": {
        "name": "GPIO7",
        "type": TYPE_GPIO
    }
}

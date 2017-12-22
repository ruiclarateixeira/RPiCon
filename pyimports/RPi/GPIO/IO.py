from RPi.GPIO.Setup import getpins, sendupdate

# Output
LOW = 1
HIGH = 2


def output(channel, output):
    getpins()[channel]['output'] = output
    sendupdate()
